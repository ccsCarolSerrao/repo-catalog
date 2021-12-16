import { FactorScoreResponse } from './factor-score.response';
import { RepoScoreResponse } from './repo-score.response';

export class ReportResponse {
    teamScore: Number;
    repoScore: RepoScoreResponse;
    factorScore: FactorScoreResponse;
}
