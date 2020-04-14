export abstract class BaseValidator {
    public logError : string[] ;
    private next: BaseValidator;

    constructor(logError: string[] ) {
        this.logError = logError
    }

    public setNext(nextBaseValidator: BaseValidator): BaseValidator {
        // console.log('NEXT BASE VALIDATORR', nextBaseValidator)
        this.next = nextBaseValidator;
        return nextBaseValidator;
    }

    public nextAction(vacation: any): BaseValidator {
        console.log('THIIIIIIIIIIIISS,', this.next)
        if (this.next)
            return this.next.validate(vacation)
    } 

    public abstract validate(vacation: any);
}