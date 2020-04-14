import { Response } from "express";
import { logRouteError, logCrashError } from "./Log";

function setErrorMessage(code: number) {
  switch (code) {
    case 400:
      return "ERR_BAD_REQUEST";
    case 401:
      return "ERR_UNAUTHORIZED";
    case 403:
      return "ERR_FORBIDDEN";
    case 404:
      return "ERR_NOT_FOUND";
    default:
      return "ERR_SERVER";
  }
}

export function sendError(res: Response, code: number = 500, msg: string = "An error occurred") {
  logRouteError(`${code}\n${msg}`);
  res.status(code).json({
    message: setErrorMessage(code)
  });
}

export function throwError(msg: string = "An error occurred") {
  logCrashError(msg);
  throw new Error(msg);
}
