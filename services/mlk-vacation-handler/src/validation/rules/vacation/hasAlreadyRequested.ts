import { BaseValidator } from '../../interface/baseValidator';
import * as vr from '../../services/VacationRequest';

export class HasAlreadyRequested extends BaseValidator {
    public async validate(vacation: any) {

        const { dates, userId } = vacation;
        const fetchedVacations = (await vr.getAllVacationsByUserId(userId)).map(v => v.date.split('T')[0])

        let shouldBreak = false;
        dates.map(d => d.split('T')[0]).forEach(cur => {
            if (fetchedVacations.includes(cur)) {
                shouldBreak = true;
                return;
            }
        })

        if (shouldBreak) {
            this.logError.push(`You already requested vacations on those days.`);
            return;
        }
            
        await super.nextAction(vacation)
    }
}
