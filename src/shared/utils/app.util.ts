import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export class AppUtil {
    static config(app: INestApplication) {
        app.use(helmet.noSniff());
        app.use(helmet.hidePoweredBy());
        app.use(helmet.hsts());

        app.setGlobalPrefix('api');
    }
}
