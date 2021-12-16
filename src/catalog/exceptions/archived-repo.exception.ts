import { ConflictException } from '@nestjs/common';

export class ArchivedRepoException extends ConflictException {
    constructor() {
        const message = 'Could not create calatog. This repo is archived.';
        super(null, message);
        this.name = ArchivedRepoException.name;
    }
}
