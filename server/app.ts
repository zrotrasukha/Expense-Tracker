import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRouter } from "./router/expenseRouter";
import { serveStatic } from 'hono/bun'
import { cors } from "hono/cors";
// import { CorsConfig } from "@/utils/corsConfig";
//

const app = new Hono();
app.use('/api/*', cors({
    origin: process.env.NODE_ENV === 'development' ? '*'
        : 'https://expense-tracker-production-d788.up.railway.app/',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const apiRoute = app.basePath('/api')
    .route("/expenses", expenseRouter);
app.use("*", logger());
app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))


export type apiRoute = typeof apiRoute;
export default app;