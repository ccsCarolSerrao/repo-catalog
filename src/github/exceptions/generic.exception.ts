import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class GenericException extends HttpException {
    constructor(errors: Error, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(errors, statusCode);
    }
}
