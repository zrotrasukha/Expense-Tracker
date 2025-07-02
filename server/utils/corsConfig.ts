import { cors } from "hono/cors";

export const CorsConfig = cors({
    origin: process.env.NODE_ENV === 'development' ? '*'
        : 'https://expense-tracker-production-d788.up.railway.app/',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})