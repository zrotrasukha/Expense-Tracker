import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRouter } from "./router/expenseRouter";
import { serveStatic } from 'hono/bun'
import { CorsConfig } from "@/utils/corsConfig";

const app = new Hono();
app.use('/api/*', CorsConfig);

const apiRoute = app.basePath('/api')
    .route("/expenses", expenseRouter);
app.use("*", logger());
app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))


export type apiRoute = typeof apiRoute;
export default app;