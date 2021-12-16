import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppUtil } from '@shared/utils/app.util';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    AppUtil.config(app);

    const configService = app.get(ConfigService);

    await app.listen(configService.get<number>('PORT')!);
}
bootstrap();
