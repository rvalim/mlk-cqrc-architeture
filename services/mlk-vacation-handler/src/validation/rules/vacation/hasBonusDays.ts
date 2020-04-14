import { BaseValidator}  from '../../interface/baseValidator';
import * as vr from '../../services/VacationRequest'

export class HasBonusDays extends BaseValidator{
    public async validate(vacation: any) {

        const { dates } = vacation;
    
        const vacationTypes = await vr.getTypeList(true);
        
        if (vacationTypes[1].numDays < dates.length) {
            this.logError.push(`You can't have more than ${vacationTypes[1].numDays} bonus days.`);
            return;
        } 
        
        await super.nextAction(vacation)
    }
} 
