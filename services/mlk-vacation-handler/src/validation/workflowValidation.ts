import * as vr from "./services/VacationRequest";
import * as pr from "./services/ProfileRequest";
import * as wr from "./services/WorkflowRequest";
import * as ar from "./services/AuthRequest";
import { Vacation } from "../models/Vacation";

enum Type {
    WaitingForAction = 0,
    Canceled = 1
}

export async function approve(args) {
    const shouldApprove = await checkAccess(Type.WaitingForAction, args);

    return shouldApprove ? wr.approve(args) : null;
}

export async function reprove(args) {
    const shouldReprove = await checkAccess(Type.WaitingForAction, args);

    return shouldReprove ? wr.reprove(args) : null;
}

export async function cancel(args) {
    const shouldCancel = await checkAccess(Type.Canceled, args);

    return shouldCancel ? wr.cancel(args) : null;
}

export async function checkAccess(type: Type, args) {
    const users = await vr.getUserIdByVacations(args.vacationIds)

    if (users.length - 1 > 0)
        throw new Error('Vacations from several employees, shall be made separately')

    switch (type) {
        case 0:
            const managerId = await pr.getManagerIdByUserId(users[0])
        
            if (args.userId != managerId)
                throw new Error('The approver is not the user\'s manager')
        
            const activeState = await vr.getStateById(args.actualStateId);
        
            const hasRole = await ar.hasRole(args.userId, activeState[0].nextState['roleId']);
        
            if (!hasRole)
                throw new Error('The approver doesn\'t have permission to approve.')
        
            return true;
        case 1: 
            if (args.userId != users[0]) 
                throw new Error('You can\'t cancel other\'s vacations.')

            return true;
    }
}
