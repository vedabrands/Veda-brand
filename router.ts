import { authRouter } from "./auth-router";
import { customAuthRouter } from "./custom-auth-router";
import { servicesRouter } from "./services-router";
import { portfolioRouter } from "./portfolio-router";
import { reviewsRouter } from "./reviews-router";
import { blogRouter } from "./blog-router";
import { faqRouter } from "./faq-router";
import { contactRouter } from "./contact-router";
import { settingsRouter } from "./settings-router";
import { analyticsRouter } from "./analytics-router";
import { teamRouter } from "./team-router";
import { pricingRouter } from "./pricing-router";
import { contentRouter } from "./content-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  customAuth: customAuthRouter,
  services: servicesRouter,
  portfolio: portfolioRouter,
  reviews: reviewsRouter,
  blog: blogRouter,
  faq: faqRouter,
  contact: contactRouter,
  settings: settingsRouter,
  analytics: analyticsRouter,
  team: teamRouter,
  pricing: pricingRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
