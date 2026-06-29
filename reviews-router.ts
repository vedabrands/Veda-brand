import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reviews } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";

export const reviewsRouter = createRouter({
  list: publicQuery
    .input(z.object({ page: z.number().optional(), limit: z.number().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const page = input?.page || 1;
      const limit = input?.limit || 50;
      const offset = (page - 1) * limit;
      
      const items = await db
        .select()
        .from(reviews)
        .where(eq(reviews.active, true))
        .orderBy(desc(reviews.pinned), desc(reviews.createdAt))
        .limit(limit)
        .offset(offset);
      
      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(reviews)
        .where(eq(reviews.active, true));
      
      return { items, total: countResult[0]?.count || 0 };
    }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        title: z.string().optional(),
        rating: z.number().min(1).max(5),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(reviews).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        title: z.string().optional(),
        rating: z.number().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(reviews).set(data).where(eq(reviews.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(reviews).where(eq(reviews.id, input.id));
      return { success: true };
    }),

  togglePin: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const item = await db.select().from(reviews).where(eq(reviews.id, input.id));
      const newPinned = !item[0]?.pinned;
      await db.update(reviews).set({ pinned: newPinned }).where(eq(reviews.id, input.id));
      return { success: true, pinned: newPinned };
    }),
});
