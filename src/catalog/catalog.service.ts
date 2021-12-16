import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GitHubService } from '@github/github.service';
import { CatalogRequest } from './v1/dtos/catalog.request';
import { BranchDto } from '@github/dtos/branch.dto';
import { CatalogDto } from '@shared/dtos/catalog.dto';
import { BufferUtil } from '@shared/utils/buffer.util';
import YAML from 'yaml';
import catalogConfig from '@shared/configs/catalog.config';
import { CatalogResponse } from './v1/dtos/catalog.response';
import { RepoDto } from '@github/dtos/repo.dto';
import { ArchivedRepoException } from './exceptions/archived-repo.exception';

@Injectable()
export class CatalogService {
    constructor(private readonly _gitHubService: GitHubService) {}

    async createCatalogByTeam(teamSlug: string, catalogRequest: CatalogRequest) {
        const repos = await this._gitHubService.getReposByTeam(teamSlug);

        const reposToWork = catalogRequest.repoArchived ? repos : repos.filter((x) => !x.archived && !x.disabled);

        for (var repo of reposToWork) {
            await this.createCatalogByRepo(repo.name, catalogRequest);
        }
    }

    async createCatalogByRepo(repoName: string, catalogRequest: CatalogRequest, repo?: RepoDto) {
        const repoToWork = repo ? repo : await this._gitHubService.getRepo(repoName);
        this.validateRepoArchived(catalogRequest.repoArchived, repoToWork);

        const baseBranchName = repoToWork.default_branch ?? catalogConfig().baseBranchName;

        await this.createOrGetBranch(repoName, catalogConfig().branchName, baseBranchName);

        await this.createFileToBranch(repoName, catalogConfig().branchName);

        await this._gitHubService.createPullRequest(
            repoName,
            catalogConfig().branchName,
            baseBranchName,
            catalogConfig().pullRequestTitle,
            catalogConfig().pullRequestBody,
            catalogConfig().pullRequestDraft
        );
    }

    async getCatalogByTeam(teamSlug: string, catalogRequest: CatalogRequest, onlyWithFile: boolean = false) {
        const repos = await this._gitHubService.getReposByTeam(teamSlug);

        const reposToWork = catalogRequest.repoArchived ? repos : repos.filter((x) => !x.archived && !x.disabled);

        const catalogs: CatalogResponse[] = [];

        for (var repo of reposToWork) {
            let catalog = {} as CatalogResponse;

            try {
                catalog = await this.getCatalogByRepo(repo.name, catalogRequest);
            } catch (error) {
                const status = (error as HttpException).getStatus();
                if (status != HttpStatus.NOT_FOUND) {
                    throw error;
                }

                if (!onlyWithFile) {
                    catalog = { repoName: repo.name };
                }
            }

            if (Object.keys(catalog).length > 0) {
                catalogs.push(catalog);
            }
        }

        return catalogs;
    }

    async getCatalogByRepo(repoName: string, catalogRequest: CatalogRequest, repo?: RepoDto) {
        const repoToWork = repo ? repo : await this._gitHubService.getRepo(repoName);
        this.validateRepoArchived(catalogRequest.repoArchived, repoToWork);

        const file = await this._gitHubService.getFileFromBranch(repoName, catalogConfig().path);

        const content = BufferUtil.buffertoData(file.content ?? '');

        const catalog = YAML.parse(content) as CatalogDto;

        return { repoName, catalog } as CatalogResponse;
    }

    private validateRepoArchived(archived: Boolean, repo: RepoDto) {
        if (!archived && repo.archived) {
            throw new ArchivedRepoException();
        }
    }

    private async createFileToBranch(repoName: string, branchName: string) {
        const file = new CatalogDto();
        const yamlContent = YAML.stringify(file);
        const content = BufferUtil.dataToBuffer(yamlContent);

        await this._gitHubService.createFileToBranch(repoName, branchName, catalogConfig().path, content, catalogConfig().commitMessage);
    }

    private async createOrGetBranch(repoName: string, branchName: string, baseBranchName: string) {
        let newBranch: BranchDto;

        try {
            newBranch = await this._gitHubService.createBrach(repoName, branchName, baseBranchName);
        } catch (error) {
            const status = (error as HttpException).getStatus();
            if (status == HttpStatus.UNPROCESSABLE_ENTITY) {
                newBranch = await this._gitHubService.getBrach(repoName, branchName);
            } else {
                throw error;
            }
        }

        return newBranch;
    }
}
