import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { siteUsers, users } from "@db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const customAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email().optional(),
        role: z.enum(["user", "guest"]).default("user"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const unionId = randomUUID();
      
      // Insert into site_users
      const result = await db.insert(siteUsers).values({
        name: input.name,
        email: input.email || null,
        role: input.role,
      });
      
      // Also insert into users table for session tracking
      await db.insert(users).values({
        unionId,
        name: input.name,
        email: input.email || null,
        role: "user",
      });
      
      const userId = Number(result[0].insertId);
      const token = btoa(JSON.stringify({ id: userId, name: input.name, role: input.role }));
      
      return { id: userId, name: input.name, token };
    }),

  adminLogin: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@aaravfashion.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      
      if (input.email === adminEmail && input.password === adminPassword) {
        const token = btoa(JSON.stringify({ email: adminEmail, password: adminPassword }));
        return { success: true, token };
      }
      
      return { success: false };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const userToken = ctx.req.headers.get("x-user-token");
    if (userToken) {
      try {
        const payload = JSON.parse(atob(userToken));
        return { id: payload.id, name: payload.name, role: payload.role };
      } catch {
        return null;
      }
    }
    if (ctx.user) {
      return { id: ctx.user.id, name: ctx.user.name, role: ctx.user.role };
    }
    return null;
  }),

  logout: publicQuery.mutation(() => {
    return { success: true };
  }),

  getSiteUsers: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(siteUsers).orderBy(siteUsers.createdAt);
  }),
});
