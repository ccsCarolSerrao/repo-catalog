export enum RepoType {
    API = 'api',
    BATCH = 'batch',
    WEBSITE = 'website',
    INFRASTRUCTURE = 'infrastructure',
}

export enum MaturityLevelStatus {
    NOT_APPLICABLE = -1,
    NOT_MEET = 0,
    PARTIALLY_MEET = 1,
    MEET = 2,
}

export enum MaturityLevelFactor {
    EXTERNALIZED_CONFIGURATION = 'externalizedConfiguration',
    EXTERNALIZED_LOG = 'externalizedLog',
    EXTERNALIZED_METRIC = 'externalizedMetric',
    AUTOMATED_DEPLOYMENT = 'automatedDeployment',
    CODE_COVERAGE = 'codeCoverage',
    ALARM = 'alarm',
    CODE_PARITY = 'codeParity',
    GRACEFUL_SHUTDOWN = 'gracefulShutdown',
    CIRCUITBREAKER = 'circuitBreaker',
    HEALTHCHECK = 'healthcheck',
    DOCUMENTATION = 'documentation',
}
