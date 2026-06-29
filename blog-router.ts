import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogPosts } from "@db/schema";
import { eq, desc, sql, and, like } from "drizzle-orm";

export const blogRouter = createRouter({
  list: publicQuery
    .input(z.object({ category: z.string().optional(), page: z.number().optional(), limit: z.number().optional(), search: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const page = input?.page || 1;
      const limit = input?.limit || 20;
      const offset = (page - 1) * limit;
      
      let query = db.select().from(blogPosts).where(eq(blogPosts.active, true));
      
      if (input?.category) {
        query = db.select().from(blogPosts).where(and(eq(blogPosts.active, true), eq(blogPosts.category, input.category)));
      }
      if (input?.search) {
        query = db.select().from(blogPosts).where(and(eq(blogPosts.active, true), like(blogPosts.title, `%${input.search}%`)));
      }
      
      const items = await query.orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);
      const countResult = await db.select({ count: sql<number>`count(*)` }).from(blogPosts).where(eq(blogPosts.active, true));
      return { items, total: countResult[0]?.count || 0 };
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, input.slug));
      return posts[0] || null;
    }),

  create: adminQuery
    .input(z.object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string().optional(),
      content: z.string(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      imageUrl: z.string().optional(),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(blogPosts).values(input);
      return { id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      slug: z.string().optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      imageUrl: z.string().optional(),
      featured: z.boolean().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(blogPosts).set({ active: false }).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});
