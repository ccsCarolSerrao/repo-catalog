import { GitHubService } from '@github/github.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('github')
@Controller('v1/github')
export class GitHubController {
    constructor(private readonly _githubService: GitHubService) { }

    @Get('teams/:team/repos')
    @ApiOperation({ summary: 'List configuration from github repositories by team name' })
    getReposByTeam(@Param('team') team: string) {
        return this._githubService.getReposByTeam(team);
    }

    @Get('repos/:repo')
    @ApiOperation({ summary: 'Get configuration from github repository by repo name' })
    getRepo(@Param('repo') repo: string) {
        return this._githubService.getRepo(repo);
    }
}
