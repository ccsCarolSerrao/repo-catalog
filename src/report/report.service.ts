import { CatalogService } from '@catalog/catalog.service';
import { Injectable } from '@nestjs/common';
import { MaturityLevelFactor, MaturityLevelStatus } from '@shared/enums';
import { MathUtil } from '@shared/utils/math.util';
import { FactorScoreResponse } from './v1/dtos/factor-score.response';
import { RepoScoreResponse } from './v1/dtos/repo-score.response';
import { ReportRequest } from './v1/dtos/report.request';
import { ReportResponse } from './v1/dtos/report.response';

const MULTIPLIER = 2;

@Injectable()
export class ReportService {
    constructor(private readonly _catalogService: CatalogService) {}

    async getReportByTeam(teamSlug: string, reportRequest: ReportRequest) {
        let reportResponse = {} as ReportResponse;
        let factorScore: FactorScoreResponse = {};
        let repoScore: RepoScoreResponse = {};

        const catalogs = await this._catalogService.getCatalogByTeam(teamSlug, reportRequest, reportRequest.onlyWithCatalog);
        const totalRepo = catalogs.length;
        const totalFactor = Object.keys(MaturityLevelFactor).length;

        for (const catalog of catalogs) {
            for (const key of Object.values(MaturityLevelFactor)) {
                let score = Number(catalog.catalog?.maturityLevel[key as MaturityLevelFactor]?.status);
                score = this.buildScore(score);

                if (factorScore[key]) {
                    factorScore[key] += score;
                } else {
                    factorScore[key] = score;
                }

                if (repoScore[catalog.repoName]) {
                    repoScore[catalog.repoName] += score;
                } else {
                    repoScore[catalog.repoName] = score;
                }
            }

            repoScore[catalog.repoName] = this.buildTotalRepoScore(repoScore[catalog.repoName], totalFactor);
        }

        const { totalFactorStore, totalTeamScore } = this.buildTotalFactorAndTeamScore(factorScore, totalRepo, totalFactor);

        reportResponse.repoScore = repoScore;
        reportResponse.factorScore = totalFactorStore;
        reportResponse.teamScore = totalTeamScore;

        return reportResponse;
    }

    private buildTotalRepoScore(repoScore: number, totalFactor: number) {
        repoScore /= totalFactor * MULTIPLIER;

        return MathUtil.toPercente(repoScore);
    }

    private buildTotalFactorAndTeamScore(totalFactorStore: FactorScoreResponse, totalRepo: number, totalFactor: number) {
        let totalTeamScore: number = 0;

        for (const key of Object.values(MaturityLevelFactor)) {
            totalFactorStore[key] /= totalRepo * MULTIPLIER;
            totalFactorStore[key] = MathUtil.toPercente(totalFactorStore[key]);

            totalTeamScore += totalFactorStore[key];
        }

        totalTeamScore /= totalFactor;
        totalTeamScore = MathUtil.toRound(totalTeamScore);

        return { totalFactorStore, totalTeamScore };
    }

    private buildScore(score: number) {
        return isNaN(score) ? 0 : score == MaturityLevelStatus.NAO_APLICAVEL ? MULTIPLIER : score;
    }
}
