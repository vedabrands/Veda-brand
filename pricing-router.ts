import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { pricingPlans } from "@db/schema";
import { eq } from "drizzle-orm";

export const pricingRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(pricingPlans).where(eq(pricingPlans.active, true));
  }),

  create: adminQuery
    .input(z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      price: z.number().optional(),
      yearlyPrice: z.number().optional(),
      features: z.array(z.string()),
      highlighted: z.boolean().optional(),
      buttonText: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(pricingPlans).values({
        ...input,
        price: input.price ? String(input.price) : null,
        yearlyPrice: input.yearlyPrice ? String(input.yearlyPrice) : null,
      });
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      price: z.number().optional(),
      yearlyPrice: z.number().optional(),
      features: z.array(z.string()).optional(),
      highlighted: z.boolean().optional(),
      buttonText: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(pricingPlans).set(data).where(eq(pricingPlans.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(pricingPlans).where(eq(pricingPlans.id, input.id));
      return { success: true };
    }),
});
