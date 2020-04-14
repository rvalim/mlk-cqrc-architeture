import ServiceManager from "../services/serviceManager";

export function restricted(role: string, action: string, resource: string) {
  // return ServiceManager.getInstance().acl.can(role).execute(action).on(resource).granted;
  return true;
}
