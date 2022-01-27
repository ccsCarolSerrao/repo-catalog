import { MaturityLevelFactor } from '@shared/enums';
import { MaturityLevelConfigurationDto } from './maturity-level-configuration.dto';

type MaturityLevel = {
    [key in MaturityLevelFactor]: MaturityLevelConfigurationDto;
};

export class MaturityLevelDto implements MaturityLevel {
    report?: boolean = undefined;
    externalizedConfiguration: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    externalizedLog: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    externalizedMetric: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    automatedDeployment: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    codeCoverage: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    alarm: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    codeParity: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    gracefulShutdown: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    circuitBreaker: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    healthcheck: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
    documentation: MaturityLevelConfigurationDto = new MaturityLevelConfigurationDto();
}
