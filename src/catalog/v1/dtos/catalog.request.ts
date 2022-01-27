import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CatalogRequest {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    repoArchived: boolean;
}
