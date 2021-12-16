import { CatalogModule } from '@catalog/catalog.module';
import { GitHubModule } from '@github/github.module';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from '@report/report.module';
import { default as config } from '@shared/configs';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            load: [config],
        }),
        CatalogModule,
        ReportModule,
        GitHubModule,
    ],
})
export class AppModule {}
