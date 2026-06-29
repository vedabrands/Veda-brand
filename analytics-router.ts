import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { analytics } from "@db/schema";
import { sql, gte } from "drizzle-orm";

export const analyticsRouter = createRouter({
  track: publicQuery
    .input(z.object({
      type: z.string(),
      path: z.string().optional(),
      userType: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const ipAddress = ctx.req.headers.get("x-forwarded-for") || "unknown";
      await db.insert(analytics).values({
        ...input,
        ipAddress: ipAddress.substring(0, 45),
      });
      return { success: true };
    }),

  getStats: adminQuery
    .input(z.object({ period: z.enum(["today", "week", "month"]).optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const period = input?.period || "today";
      
      let dateFilter: Date;
      const now = new Date();
      if (period === "today") {
        dateFilter = new Date(now.setHours(0, 0, 0, 0));
      } else if (period === "week") {
        dateFilter = new Date(now.setDate(now.getDate() - 7));
      } else {
        dateFilter = new Date(now.setDate(now.getDate() - 30));
      }
      
      const pageViews = await db.select({ count: sql<number>`count(*)` }).from(analytics)
        .where(gte(analytics.createdAt, dateFilter));
      
      return {
        pageViews: pageViews[0]?.count || 0,
        period,
      };
    }),

  getVisitorCounts: adminQuery.query(async () => {
    const db = getDb();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitors = await db.select({ count: sql<number>`count(*)` }).from(analytics)
      .where(gte(analytics.createdAt, today));
    const totalVisitors = await db.select({ count: sql<number>`count(*)` }).from(analytics);
    const users = await db.select({ count: sql<number>`count(distinct ipAddress)` }).from(analytics)
      .where(sql`userType = 'user'`);
    const guests = await db.select({ count: sql<number>`count(distinct ipAddress)` }).from(analytics)
      .where(sql`userType = 'guest'`);
    
    return {
      today: todayVisitors[0]?.count || 0,
      total: totalVisitors[0]?.count || 0,
      users: users[0]?.count || 0,
      guests: guests[0]?.count || 0,
    };
  }),
});
