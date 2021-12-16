import { RepoType } from '../enums';

export class MetadataDto {
    name?: string = undefined;
    description?: string = undefined;
    team?: string = undefined;
    owners?: string[] = undefined;
    type?: RepoType = undefined;
    productiveDate?: Date = undefined;
}
