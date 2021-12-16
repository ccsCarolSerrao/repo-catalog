import { MaturityLevelDto } from './maturity-level.dto';
import { MetadataDto } from './metadata.dto';

export class CatalogDto {
    version?: string = undefined;
    metadata: MetadataDto = new MetadataDto();
    maturityLevel: MaturityLevelDto = new MaturityLevelDto();
}
