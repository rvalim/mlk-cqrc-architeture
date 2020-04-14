import { validationFabric } from './validationFabric'
import { CustomException } from './customExpection';

export async function validate(model: any) {
    const validator = await validationFabric(model.typeId)

    await validator.validate(model)

    if (validator.logError.length > 0) 
        throw new CustomException(JSON.stringify(validator.logError))
}