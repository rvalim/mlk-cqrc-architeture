import { BaseValidator } from '../../interface/baseValidator'
import { hasRole } from '../../services/AuthRequest'

export class HasValidRole extends BaseValidator {
    validate(vacation: any) {

        console.log(vacation)

        // if (authReq.hasRole())

        this.logError.push('Error: Valid role')

        super.nextAction(vacation)
    }
}