import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ReportRequest {
    @IsBoolean()
    @IsNotEmpty()
    repoArchived: boolean;

    @IsBoolean()
    @IsNotEmpty()
    onlyWithCatalog: boolean;
}
