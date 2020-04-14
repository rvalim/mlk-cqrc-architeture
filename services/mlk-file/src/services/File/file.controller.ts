import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { File } from "../../models/File";
import { fileSchema, fileUpdateSchema } from "./file.schema";
import jwt from "jsonwebtoken";
import { fromNode } from "bluebird";

interface MulterFile {
  key: string // Available using `S3`.
  path: string // Available using `DiskStorage`.
  mimetype: string
  originalname: string
  size: number
}

export default class FileController extends BaseController<File> {
  public async createFromBroker(body: object) {
    try {
      const validateSchema = Joi.validate(body, fileSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const file = await File.create<File>(body);
      file.save();
    } catch (e) {
      sendError(null, 500, e);
    }
  }

  public async create (req: Request & { file: MulterFile }, res: Response, next: NextFunction) {
    try {

      const file = {
        fileName: req.file.path,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
        mimetype: req.file.mimetype
      }

      const files = await File.create<File>(file);
      files.save()

      res.status(200).json({file: file, message: 'Successful upload!'})

    } catch (err) {
      sendError(res, 500, err)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const file = await File.findById<File>(req.params.id);
      res.setHeader('X-Accel-Redirect', `/download/${file.fileName}`)

      if (file.mimetype) {
        res.setHeader('Content-Type', file.mimetype)
      } else {
        res.setHeader('Content-Type', 'image/png')
      }

      res.status(200).json({message: ''})
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    // (currentPage - 1) * perPage
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 0;

    const offset = (page - 1) * itemsPerPage;  

    try {
      const file = await File.findAndCountAll<File>({
        where: JSON.parse(<any>req.query.where || null), 
        limit: itemsPerPage,
        offset,
        include: [File]
      });
      res.setHeader('X-Count-All', file.count)
      res.status(200).json(file.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, fileUpdateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const file = await File.findById<File>(req.params.id);
      res.status(200).json(file);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const file = await File.findById<File>(req.params.id);
      file.destroy();
      res.status(200).json(file);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
