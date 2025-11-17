import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@lective/api/context";
import { appRouter } from "@lective/api/routers/index";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => createContext({ context }),
  })
);

app.get("/", (c) => c.text("OK"));

export default app;
