import express = require("express");
import createError = require("http-errors");
import logger = require("morgan");
import { Request, Response, NextFunction } from "express";
import DataSource from "./dataSource";
import ServiceManager from "./services/serviceManager";
import { throwError } from "./utils/Error";
import cors from "cors";

class App {
  public app: express.Application;
  public serviceManager: ServiceManager | null;

  constructor() {
    this.app = express();
    this.serviceManager = null;
    this.init();
  }

  private async init() {
    try {
      await new DataSource().init();

      this.app.use(logger("dev"));
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));

      this.serviceManager = ServiceManager.getInstance(this.app);

      // catch 404 and forward to error handler
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        next(createError(404) as any);
      });

      // error handler
      this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ message: err.message });
      });
    } catch (e) {
      throwError(e);
    }
  }
}

export default new App().app;
