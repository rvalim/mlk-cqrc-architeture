import { BaseValidator}  from '../../interface/baseValidator'
import * as vr from '../../services/VacationRequest';

export class HasPendingApproval extends BaseValidator {
    public async validate(vacation: any) {

        const { userId } = vacation; 
        const fetchedVacationState = await vr.getAllVacationsByUserId(userId, true);
        const stateList = await vr.getStateList();

        let shouldBreak = false;
        if (fetchedVacationState.includes(stateList['Pending'].id))
            shouldBreak = true;

        // this is !shouldBreak just for testing, must be shouldBreak
        if (!shouldBreak) {
            this.logError.push(`You have requested vacations with pending status.`);
            return;
        }
        
        await super.nextAction(vacation);
    }
} 
