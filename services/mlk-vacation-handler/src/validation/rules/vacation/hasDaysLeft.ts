import { BaseValidator}  from '../../interface/baseValidator'
import * as pr from '../../services/ProfileRequest';

export class HasDaysLeft extends BaseValidator{
    public async validate(vacation: any) {
        
        const { userId, dates } = vacation;
        
        const daysLeft = await pr.getVacationDays(userId);

        if (daysLeft < dates.length) {
            this.logError.push(`You're requesting ${dates.length} days and you only have ${daysLeft} left.`);
            return;
        }
        
        await super.nextAction(vacation);
    }
} 
