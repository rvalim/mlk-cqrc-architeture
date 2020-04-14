import fs from "fs";
import path from "path";

const CRASH_ERROR_LOG_PATH = path.resolve(__dirname, "../../logs/crash.errorlog.txt");
const ROUTE_ERROR_LOG_PATH = path.resolve(__dirname, "../../logs/route.errorlog.txt");

enum LogType {
  Crash,
  Route
}

export async function logCrashError(message: string) {
  fsWriteLog(LogType.Crash, message);
}

export async function logRouteError(message: string) {
  fsWriteLog(LogType.Route, message);
}

async function fsWriteLog(type: LogType, message: string) {
  try {
    await fs.appendFile(
      type === LogType.Crash ? CRASH_ERROR_LOG_PATH : ROUTE_ERROR_LOG_PATH,
      `\n${new Date().toISOString()}\n${message}\n`,
      (err) => console.info("# Error log saved"));
    return true;
  } catch (e) {
    return false;
  }
}
