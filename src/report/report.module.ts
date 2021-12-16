import { Global, Module } from '@nestjs/common';
import { ReportController } from './v1/report.controller';
import { ReportService } from './report.service';
import { CatalogModule } from '@catalog/catalog.module';

@Global()
@Module({
    imports: [CatalogModule],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
