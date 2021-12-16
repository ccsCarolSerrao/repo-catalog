import { InternalServerErrorException } from '@nestjs/common';

export class ListReposException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not list repos';
        super(errors, message);
        this.name = ListReposException.name;
    }
}
