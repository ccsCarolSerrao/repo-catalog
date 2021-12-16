export enum RepoType {
    API = 'api',
    BATCH = 'batch',
}

export enum MaturityLevelStatus {
    NAO_APLICAVEL = -1,
    NAO_ATENDE = 0,
    ATENDE_PARCIALMENTE = 1,
    ATENDE = 2,
}

export enum MaturityLevelFactor {
    EXTERNALIZED_CONFIGURATION = 'externalizedConfiguration',
    EXTERNALIZED_LOG = 'externalizedLog',
    EXTERNALIZED_METRIC = 'externalizedMetric',
    AUTOMATED_DEPLOYMENT = 'automatedDeployment',
    CODE_COVERAGE = 'codeCoverage',
    ZERO_DOWNTIME = 'zeroDowntime',
    ALARM = 'alarm',
    CODE_PARITY = 'codeParity',
    GRACEFUL_SHUTDOWN = 'gracefulShutdown',
    CIRCUITBREAKER = 'circuitBreaker',
    HEALTHCHECK = 'healthcheck',
}
