import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppUtil } from '@shared/utils/app.util';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    AppUtil.config(app);

    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Maturity Level')
        .setDescription('Maturity Level')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(configService.get<number>('PORT')!);
}
bootstrap();
