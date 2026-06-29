import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { faqs } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const faqRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(faqs).where(eq(faqs.active, true)).orderBy(asc(faqs.order));
  }),

  create: adminQuery
    .input(z.object({
      question: z.string(),
      answer: z.string(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(faqs).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      question: z.string().optional(),
      answer: z.string().optional(),
      order: z.number().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(faqs).set(data).where(eq(faqs.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(faqs).where(eq(faqs.id, input.id));
      return { success: true };
    }),

  reorder: adminQuery
    .input(z.object({
      items: z.array(z.object({ id: z.number(), order: z.number() })),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (const item of input.items) {
        await db.update(faqs).set({ order: item.order }).where(eq(faqs.id, item.id));
      }
      return { success: true };
    }),
});
