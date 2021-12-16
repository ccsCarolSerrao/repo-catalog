import { HttpException, Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { RequestError } from '@octokit/request-error';
import githubConfig from '@shared/configs/github.config';
import { RepoDto } from './dtos/repo.dto';
import { CreatePullRequestException } from './exceptions/create-pull-request.exception';
import { BranchDto } from './dtos/branch.dto';
import { CreateBranchException } from './exceptions/create-branch.exception';
import { CreateFileBranchException } from './exceptions/create-file-branch.exception';
import { ListReposException } from './exceptions/list-repos.exception';
import { GetBranchException } from './exceptions/get-branch.exception';
import { GenericException } from './exceptions/generic.exception';
import { ContentDto } from './dtos/content.dto';

@Injectable()
export class GitHubService {
    private _octokit: Octokit;

    constructor() {
        this._octokit = new Octokit({
            auth: githubConfig().auth,
            userAgent: githubConfig().userAgent,
        });
    }

    async getBrach(repoName: string, branchName: string) {
        const reference = `heads/${branchName}`;

        try {
            const { data } = await this._octokit.rest.git.getRef({
                owner: githubConfig().org,
                repo: repoName,
                ref: reference,
            });

            return data as BranchDto;
        } catch (error) {
            throw this.handleException(error, GetBranchException);
        }
    }

    async createBrach(repoName: string, branchName: string, baseBranchName: string) {
        const reference = `refs/heads/${branchName}`;

        try {
            const { data } = await this._octokit.rest.git.createRef({
                owner: githubConfig().org,
                repo: repoName,
                ref: reference,
                sha: (await this.getBrach(repoName, baseBranchName)).object.sha,
            });

            return data as BranchDto;
        } catch (error) {
            throw this.handleException(error, CreateBranchException);
        }
    }

    async createFileToBranch(repoName: string, branchName: string, path: string, content: any, commitMessage: string) {
        try {
            await this._octokit.rest.repos.createOrUpdateFileContents({
                owner: githubConfig().org,
                repo: repoName,
                branch: branchName,
                path,
                message: commitMessage,
                content,
            });
        } catch (error) {
            throw this.handleException(error, CreateFileBranchException);
        }
    }

    async getFileFromBranch(repoName: string, path: string) {
        try {
            const { data } = await this._octokit.rest.repos.getContent({
                owner: githubConfig().org,
                repo: repoName,
                path,
            });

            return data as ContentDto;
        } catch (error) {
            throw this.handleException(error, CreateFileBranchException);
        }
    }

    async createPullRequest(repoName: string, branchName: string, baseBranchName: string, title: string, body: string, draft: boolean = false) {
        try {
            const { data } = await this._octokit.rest.pulls.create({
                owner: githubConfig().org,
                repo: repoName,
                head: branchName,
                base: baseBranchName,
                title,
                body,
                draft,
                maintainer_can_modify: true,
            });
        } catch (error) {
            throw this.handleException(error, CreatePullRequestException);
        }
    }

    async getRepo(repoName: string) {
        try {
            const { data } = await this._octokit.rest.repos.get({
                owner: githubConfig().org,
                repo: repoName,
            });

            return data as RepoDto;
        } catch (error) {
            throw this.handleException(error, ListReposException);
        }
    }

    async getReposByTeam(teamSlug: string) {
        let pageNumber = 1;
        let dataLength = 0;
        const repos: RepoDto[] = [];

        try {
            do {
                const { data } = await this._octokit.rest.teams.listReposInOrg({
                    org: githubConfig().org,
                    team_slug: teamSlug,
                    per_page: githubConfig().pageSize,
                    page: pageNumber,
                });

                repos.push(...data);

                dataLength = data.length;
                pageNumber++;
            } while (dataLength >= githubConfig().pageSize);

            return repos;
        } catch (error) {
            throw this.handleException(error, ListReposException);
        }
    }

    private handleException<T extends HttpException>(error: any, errorClass: { new (...args: any): T }) {
        if (error instanceof RequestError) {
            throw new GenericException(error as Error, error.status);
        }

        throw new errorClass(error as Error);
    }
}
