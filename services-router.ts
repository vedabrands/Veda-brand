import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { services } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const servicesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).where(eq(services.active, true));
  }),

  getByCategory: publicQuery
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(services)
        .where(and(eq(services.category, input.category), eq(services.active, true)));
    }),

  create: adminQuery
    .input(
      z.object({
        category: z.string(),
        title: z.string(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        process: z.array(z.string()).optional(),
        icon: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(services).values({
        ...input,
        features: input.features || [],
        benefits: input.benefits || [],
        process: input.process || [],
      });
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        category: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        process: z.array(z.string()).optional(),
        icon: z.string().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(services).set(data).where(eq(services.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(services).set({ active: false }).where(eq(services.id, input.id));
      return { success: true };
    }),
});
