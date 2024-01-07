import path from "path";
import { config } from "dotenv-safe";
config({ path: path.join(__dirname, "../.env") });

import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import logger from "./utils/logger";
import { TokenData, UserPermissions } from "./types";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { getConnection, getConnectionManager } from "typeorm";
import { User } from "./entity/User";
import { AuthController } from "./controllers/auth";
import { dbConnection } from "./utils/dbConnection";
import { CustomErrorHandler } from "./middleware/errorHandler";
import { Container } from "typedi";
import { AdminController } from "./controllers/admin";
import { BooksController } from "./controllers/books";

async function run() {
  try {
    const conn = await dbConnection();
    useContainer(Container);

    const app = express();
    app.use(express.json({ limit: "50mb" }));
    app.all("/*", (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", process.env.CORS_DOMAINS);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "*");

      next();
    });
    app.use(express.static(path.join(__dirname, "../public")));

    app.use(
      morgan("combined", {
        stream: {
          write(text: string) {
            logger.info(text);
          },
        },
      })
    );
    app.get("/health", async (_, res) => {
      await conn.query("select 1+1 as result;");
      res.send({
        status: "UP",
      });
    });

    useExpressServer(app, {
      defaultErrorHandler: false,
      middlewares: [CustomErrorHandler],
      controllers: [AuthController, AdminController, BooksController],
      authorizationChecker: (
        action: Action,
        roles: UserPermissions[]
      ): boolean => {
        const { authorization } = (action.request as Request).headers || {};
        const { token: queryToken } = (action.request as Request).query || {};

        if (!authorization && typeof queryToken !== "string") return false;
        let token = authorization?.split("Bearer ")[1];
        if (!token) token = queryToken as string;
        if (!token) return false;

        const userData = jwt.verify(token, process.env.JWT_SECRET) as TokenData;
        if (!userData) return false;

        if (userData && !roles.length) return true;

        return false;
      },
      currentUserChecker: (action: Action) => {
        const { authorization } = (action.request as Request).headers || {};
        const { token: queryToken } = (action.request as Request).query || {};

        if (!authorization && typeof queryToken !== "string") return;
        let token = authorization?.split("Bearer ")[1];
        if (!token) token = queryToken as string;
        if (!token) return;

        const userData = jwt.verify(token, process.env.JWT_SECRET) as TokenData;
        if (!userData) return;
        return getConnection()
          .getRepository(User)
          .findOne({ email: userData.email });
      },
    });
    let port = process.env.PORT ? +process.env.PORT : NaN;
    port = isNaN(port) ? 4000 : port;
    app.listen(port, () => {
      logger.info(`env is ${process.env.NODE_ENV}`);
      logger.info(`Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();

function exitHandler() {
  const mgr = getConnectionManager();

  console.log("process exiting");
  if (mgr.has("default")) {
    mgr.get("default").close();
  }
}

process.on("exit", exitHandler);
