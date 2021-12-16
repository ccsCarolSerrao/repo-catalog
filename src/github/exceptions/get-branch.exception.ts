import { InternalServerErrorException } from '@nestjs/common';

export class GetBranchException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not get branch';
        super(errors, message);
        this.name = GetBranchException.name;
    }
}
