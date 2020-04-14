import { BaseValidator } from "./interface/baseValidator";
import { HasBonusDays } from './rules/vacation/hasBonusDays';
import { HasDaysLeft } from './rules/vacation/hasDaysLeft';
import { HasPendingApproval } from './rules/vacation/hasPendingApproval';
import { HasAlreadyRequested } from './rules/vacation/hasAlreadyRequested';
import { getTypeList } from "./services/VacationRequest";


export async function validationFabric(typeId: number): Promise<BaseValidator> {
    const types = await getTypeList()

    switch (typeId) {
        case types['Default']:
            return createDefaultValidation()
        case types['BonusDay']:
            return createBonusDayValidation()
        default:
            throw new Error(`Validation not implemented for type '${typeId}'`)
    }
}

function createBonusDayValidation(): BaseValidator {
    const logError = []; 
    const validator = new HasAlreadyRequested(logError)

    validator.setNext(new HasBonusDays(logError))
             .setNext(new HasDaysLeft(logError))
    
    return validator
}

function createDefaultValidation(): BaseValidator {
    const logError = []; 
    const validator = new HasAlreadyRequested(logError)

    // dynamic flex pattern // chainning methods
    validator.setNext(new HasPendingApproval(logError))
             .setNext(new HasDaysLeft(logError))

    return validator;
}

