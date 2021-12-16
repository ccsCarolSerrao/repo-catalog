import { MaturityLevelStatus } from '../enums';
import { ConfigDto } from './config.dto';

export class MaturityLevelConfigurationDto {
    status?: MaturityLevelStatus = undefined;
    config: ConfigDto[] = [new ConfigDto()];
}
