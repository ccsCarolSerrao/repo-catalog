import { GitHubService } from '@github/github.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('v1/github')
export class GitHubController {
    constructor(private readonly _githubService: GitHubService) {}

    @Get('teams/:team/repos')
    getReposByTeam(@Param('team') team: string) {
        return this._githubService.getReposByTeam(team);
    }

    @Get('repos/:repo')
    getRepo(@Param('repo') repo: string) {
        return this._githubService.getRepo(repo);
    }
}
