import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CatalogRequest {
    @IsBoolean()
    @IsNotEmpty()
    repoArchived: boolean;
}
