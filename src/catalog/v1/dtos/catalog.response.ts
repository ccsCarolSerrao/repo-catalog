import { CatalogDto } from '@shared/dtos/catalog.dto';

export class CatalogResponse {
    repoName: string;
    catalog?: CatalogDto;
}
