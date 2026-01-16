import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db.js";
import { openAPI, admin } from "better-auth/plugins";
import {createMiddleware} from "hono/factory";
import * as authSchema from "@/db/schemas/auth";


export const auth = betterAuth({
	baseURL: process.env.BASE_URL,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...authSchema,
        }
    }),
    emailAndPassword: { 
        enabled: true,
    },
    trustedOrigins: ['http://localhost:3000'],
    plugins: [
		openAPI(), // REMOVE IN PRODUCTION
		admin(),
	],
	session: {
        cookieCache: {
            enabled: true,
            maxAge: 1 * 60, // Cache duration in seconds (1 minute) - Make sure this is the same as the maxAge in the frontend.
			strategy: "jwe", //Switch to "jwe" for production.
        }
    }
});

export const authMiddleware = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	await next();
        return;
  	}
  	c.set("user", session.user);
  	c.set("session", session.session);
  	await next();
});

export const requireAuth = createMiddleware(async (c, next) => {
	const user = c.get('user');
	const session = c.get('session');
	if (!user || !session) {
		return c.json({ error: 'Unauthorized!' }, 401);
	}
	await next();
});

export const requireAdmin = createMiddleware(async (c, next) => {
	const user = c.get('user');
	const session = c.get('session');
	if (!user || !session) {
		return c.json({ error: 'Unauthorized!' }, 401);
	}
	if (user.role !== 'admin') {
		return c.json({ error: 'Forbidden! You are not authorized to access this resource.' }, 403);
	}
	await next();
});

export type AuthType = {
	user: typeof auth.$Infer.Session.user | null
	session: typeof auth.$Infer.Session.session | null
}