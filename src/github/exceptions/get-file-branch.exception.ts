import { InternalServerErrorException } from '@nestjs/common';

export class GetFileBranchException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not get file from branch';
        super(errors, message);
        this.name = GetFileBranchException.name;
    }
}
