import { InternalServerErrorException } from '@nestjs/common';

export class CreatePullRequestException extends InternalServerErrorException {
    constructor(errors: Error) {
        const message = 'Could not create pull request';
        super(errors, message);
        this.name = CreatePullRequestException.name;
    }
}
