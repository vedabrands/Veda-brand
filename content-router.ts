import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { websiteContent } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const contentRouter = createRouter({
  get: publicQuery
    .input(z.object({ section: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db.select().from(websiteContent).where(eq(websiteContent.section, input.section));
      const content: Record<string, string> = {};
      for (const row of rows) {
        content[row.key] = row.value;
      }
      return content;
    }),

  getAll: publicQuery.query(async () => {
    const db = getDb();
    const rows = await db.select().from(websiteContent);
    const content: Record<string, Record<string, string>> = {};
    for (const row of rows) {
      if (!content[row.section]) content[row.section] = {};
      content[row.section][row.key] = row.value;
    }
    return content;
  }),

  update: adminQuery
    .input(z.object({
      section: z.string(),
      key: z.string(),
      value: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(websiteContent).values(input).onDuplicateKeyUpdate({ set: { value: input.value } });
      return { success: true };
    }),
});
