import { InternalServerErrorException } from '@nestjs/common';

export class CreateFileBranchException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not create file to branch';
        super(errors, message);
        this.name = CreateFileBranchException.name;
    }
}
