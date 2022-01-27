import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatalogService } from '../catalog.service';
import { CatalogRequest } from './dtos/catalog.request';

@ApiTags('catalogs')
@Controller('v1/catalogs')
@UsePipes(new ValidationPipe({ transform: true }))
export class CatalogController {
    constructor(private readonly _catalogService: CatalogService) {}

    @Post('teams/:team')
    @ApiOperation({ summary: 'Create catalog file on github repositories by team name' })
    createByTeam(@Param('team') team: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.createCatalogByTeam(team, catalogRequest);
    }

    @Post('teams/:team/repos/:repo')
    @ApiOperation({ summary: 'Create catalog file on github repository by repo name' })
    createByRepo(@Param('repo') repo: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.createCatalogByRepo(repo, catalogRequest);
    }

    @Get('teams/:team')
    @ApiOperation({ summary: 'Get catalog file on github repositories by team name' })
    async getByTeam(@Param('team') team: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.getCatalogByTeam(team, catalogRequest);
    }

    @Get('teams/:team/repos/:repo')
    @ApiOperation({ summary: 'Get catalog file on github repository by repo name' })
    async getByRepo(@Param('repo') repo: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.getCatalogByRepo(repo, catalogRequest);
    }
}
