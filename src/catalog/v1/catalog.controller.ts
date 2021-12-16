import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatalogService } from '../catalog.service';
import { CatalogRequest } from './dtos/catalog.request';

@Controller('v1/catalogs')
@UsePipes(new ValidationPipe({ transform: true }))
export class CatalogController {
    constructor(private readonly _catalogService: CatalogService) {}

    @Post('teams/:team')
    createByTeam(@Param('team') team: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.createCatalogByTeam(team, catalogRequest);
    }

    @Post('teams/:team/repos/:repo')
    createByRepo(@Param('repo') repo: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.createCatalogByRepo(repo, catalogRequest);
    }

    @Get('teams/:team')
    async getByTeam(@Param('team') team: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.getCatalogByTeam(team, catalogRequest);
    }

    @Get('teams/:team/repos/:repo')
    async getByRepo(@Param('repo') repo: string, @Body() catalogRequest: CatalogRequest) {
        return this._catalogService.getCatalogByRepo(repo, catalogRequest);
    }
}
