import { Request, Response } from "express-serve-static-core";

import { Action } from "../models/Action";

export function tryParse(payload) {
  try {
  return JSON.parse(payload);
  } catch (e) {
    return payload;
  }
}

export function tryStringify(payload) {
  try {
    return JSON.stringify(payload);
  } catch (e) {
    return payload;
  }
}

export function paginate (req: Request, filter: object) {
  if (req.query.page && req.query.itemsPerPage) {
    const page = req.query.page;
    const itemsPerPage = req.query.itemsPerPage;
    const offset = (page - 1) * itemsPerPage;

    return {
      ...filter,
      limit: itemsPerPage,
      offset
    };
  }
  return filter;
}

export function setTotalCount<T>(res: Response, results: {rows: T[]; count: number;}) {
  res.setHeader('X-Total-Count', results.count);
}
