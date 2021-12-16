import { InternalServerErrorException } from '@nestjs/common';

export class CreateBranchException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not create branch';
        super(errors, message);
        this.name = CreateBranchException.name;
    }
}
