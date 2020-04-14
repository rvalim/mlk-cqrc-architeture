import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { File } from "../../models/File";
import FileController from "./file.controller";
import uuid = require('uuid/v4');
import multer = require('multer');

export default class FileRouter extends BaseRouter<File> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<FileController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './files')
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}.${file.mimetype.split('/')[1]}` )
    }
  })

  public registerRoutes(): Router {
    // Upload File Route
    this.router.post('/', multer({storage: this.diskStorage}).single('file'), this._controller.create)

    // Download File by ID Route
    this.router.get('/:id', this._controller.getById)

    return this.router;
  }
}
