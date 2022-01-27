import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ReportRequest {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    repoArchived: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    onlyWithCatalog: boolean;
}
