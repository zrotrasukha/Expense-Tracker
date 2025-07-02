import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRouter } from "./router/exenpseRouter.ts";
import { serveStatic } from 'hono/deno'
import { cors } from 'https://deno.land/x/hono@v4.3.11/middleware.ts';


const app = new Hono();
app.use('/api/*', cors({
  origin: 'http://localhost:3000'
}));
app.use("*", logger());
app.use('*', serveStatic({ root: '../client/dist' }))
app.use('*', serveStatic({ path: '../client/index.html' }))
app.route("/api/expenses", expenseRouter);


export default app;
