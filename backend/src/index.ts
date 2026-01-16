import { Hono } from 'hono'
import { auth, AuthType } from './lib/auth';

const app = new Hono<{ Variables: AuthType }>({
  strict: false,
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default { 
  port: process.env.PORT || 9000, 
  fetch: app.fetch, 
} 
