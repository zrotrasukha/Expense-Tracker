import { hc } from "hono/client";
import type {apiRoute} from "@server/app"

const client = hc<apiRoute>('/');

export const api = client.api;
        