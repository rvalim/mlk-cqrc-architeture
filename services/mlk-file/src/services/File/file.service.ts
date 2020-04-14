import BaseService from "../baseService";
import { Application } from "express";
import { File } from "../../models/File";
import FileController from "./file.controller";
import FileRouter from "./file.router";

export default class FileService extends BaseService<File> {
  constructor(app: Application) {
    super("/file");
    this.registerRouter(
      new FileRouter(this.registerController(new FileController())),
      app
    );
  }
}
