/**
 * Module dependencies.
 */
import app from "./app";
import http = require("http");
import { logCrashError } from "./utils/Log";
const debug = require("debug")("mlk-auth:server"); //tslint:disable-line

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3030");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const p = parseInt(val, 10);

  if (isNaN(p)) {
    // named pipe
    return val;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  try {
    switch (error.code) {
      case "EACCES":
        throw new Error(bind + " requires elevated privileges");
      case "EADDRINUSE":
      throw new Error(bind + " is already in use");
      default:
        throw error;
    }
  } catch (e) {
    logCrashError(e);
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  try {
    const addr = server.address();
    const bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
    debug("Listening on " + bind);
  } catch (e) {
    logCrashError(e);
  }
}
