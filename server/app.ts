import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRouter } from "./router/expenseRouter";
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/api/*', cors({
  origin: '*'
}));
app.use("*", logger());
app.use('*', serveStatic({ root: '../client/dist' }))
app.use('*', serveStatic({ path: '../client/index.html' }))
app.route("/api/expenses", expenseRouter);


export default app;
