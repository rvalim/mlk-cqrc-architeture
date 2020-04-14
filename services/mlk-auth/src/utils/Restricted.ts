import ServiceManager from "../services/serviceManager";
import jwt from "jsonwebtoken";

export function restricted(role: string, action: string, resource: string) {
  return ServiceManager.getInstance().acl.can(role).execute(action).on(resource).granted;
}

export function extractRole(authHeader: string): string {
  return jwt.decode(authHeader, {complete: true})["payload"]["role"];
}
