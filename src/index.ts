import logixlysia from "logixlysia";
import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { rateLimit } from "elysia-rate-limit";
import connectDB from "./utils/connectDB";

// Connect to MongoDB
connectDB();
export const app = new Elysia()
  .use(rateLimit())
  .use(cors())

  .state("version", 1)
  .use(
    autoroutes({
      routesDir: "./routes",
      generateTags: false,
    })
  )
  .use(
    logixlysia({
      config: {
        ip: true,
        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
        logFilter: {
          level: ["ERROR", "WARNING"],
          status: [500, 404],
          method: "GET",
        },
      },
    })
  )

  .listen(5000);
console.log(
  `Server up at - PORT: ${app.server?.port}__HOST: ${app.server?.hostname}`
);

export type ElysiaApp = typeof app;
