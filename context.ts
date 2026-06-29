import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  admin?: boolean;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };
  
  // Check for admin token
  const adminToken = opts.req.headers.get("x-admin-token");
  if (adminToken) {
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@aaravfashion.com";
    try {
      const payload = JSON.parse(atob(adminToken));
      if (payload.email === adminEmail && payload.password === adminPassword) {
        ctx.admin = true;
        ctx.user = {
          id: 0,
          unionId: "admin",
          name: "Admin",
          email: adminEmail,
          avatar: null,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignInAt: new Date(),
        };
        return ctx;
      }
    } catch {
      // Invalid token
    }
  }
  
  // Try Kimi OAuth
  try {
    ctx.user = await authenticateRequest(opts.req.headers);
  } catch {
    // Authentication is optional here
  }
  
  return ctx;
}
