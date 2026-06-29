import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { siteSettings } from "@db/schema";
import { eq } from "drizzle-orm";

export const settingsRouter = createRouter({
  get: publicQuery.query(async () => {
    const db = getDb();
    const rows = await db.select().from(siteSettings);
    const settings: Record<string, string> = {};
    for (const row of rows) {
      if (row.key && row.value) settings[row.key] = row.value;
    }
    return settings;
  }),

  update: adminQuery
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(siteSettings).values(input).onDuplicateKeyUpdate({ set: { value: input.value } });
      return { success: true };
    }),

  bulkUpdate: adminQuery
    .input(z.object({ settings: z.record(z.string()) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (const [key, value] of Object.entries(input.settings)) {
        await db.insert(siteSettings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
      }
      return { success: true };
    }),
});
