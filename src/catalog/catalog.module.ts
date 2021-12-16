import { GitHubModule } from '@github/github.module';
import { Global, Module } from '@nestjs/common';
import { CatalogController } from './v1/catalog.controller';
import { CatalogService } from './catalog.service';
import { ConfigModule } from '@nestjs/config';
import catalogConfig from '@shared/configs/catalog.config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            load: [catalogConfig],
        }),
        GitHubModule,
    ],
    controllers: [CatalogController],
    providers: [CatalogService],
    exports: [CatalogService],
})
export class CatalogModule {}
