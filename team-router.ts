import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { teamMembers } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const teamRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(teamMembers).where(eq(teamMembers.active, true)).orderBy(asc(teamMembers.order));
  }),

  create: adminQuery
    .input(z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string().optional(),
      imageUrl: z.string().optional(),
      socialLinks: z.record(z.string()).optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(teamMembers).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      role: z.string().optional(),
      bio: z.string().optional(),
      imageUrl: z.string().optional(),
      socialLinks: z.record(z.string()).optional(),
      order: z.number().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(teamMembers).set(data).where(eq(teamMembers.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(teamMembers).where(eq(teamMembers.id, input.id));
      return { success: true };
    }),
});
