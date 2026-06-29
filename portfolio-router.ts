import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { portfolioItems } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const portfolioRouter = createRouter({
  list: publicQuery
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.category && input.category !== "all") {
        return db
          .select()
          .from(portfolioItems)
          .where(and(eq(portfolioItems.category, input.category), eq(portfolioItems.active, true)));
      }
      return db.select().from(portfolioItems).where(eq(portfolioItems.active, true));
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db.select().from(portfolioItems).where(eq(portfolioItems.id, input.id));
      return items[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string(),
        category: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        clientName: z.string().optional(),
        results: z.record(z.string()).optional(),
        featured: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(portfolioItems).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        clientName: z.string().optional(),
        results: z.record(z.string()).optional(),
        featured: z.boolean().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(portfolioItems).set(data).where(eq(portfolioItems.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(portfolioItems).set({ active: false }).where(eq(portfolioItems.id, input.id));
      return { success: true };
    }),
});
