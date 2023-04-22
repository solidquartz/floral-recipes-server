require("dotenv").config();

import express from "express";
import * as Sentry from "@sentry/node";
import { db } from "./configs/db.config";
import { ormDb } from "./configs/db-orm";
import cookieParser from "cookie-parser";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { configurePassport } from "./auth";

//routes import
import { registerFlowers } from "./routes/flowersRoutes";
import { registerProjects } from "./routes/projectsRoutes";
import { registerUsers } from "./routes/usersRoutes";

const initSentry = (app: express.Express) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());

  if (process.env.SENTRY_TRACE === "true") {
    app.use(Sentry.Handlers.tracingHandler());
  }

  app.use(Sentry.Handlers.errorHandler());
};

const run = async () => {
  const app = express();

  initSentry(app);

  try {
    await ormDb.initialize();
    await db.connect();
  } catch (err) {
    console.error(err);
  }

  const { PORT } = process.env;

  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json());

  //middleware
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://floral-recipes.vercel.app"
          : "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  configurePassport(passport, app);

  //routes
  app.use(
    "/flowers",
    passport.authenticate('jwt', { session: false }),
    registerFlowers()
  );
  app.use(
    "/projects",
    passport.authenticate('jwt', { session: false }),
    registerProjects()
  );
  app.use("/auth", registerUsers());

  //listen
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT} 👀`);
  });
};

run();
