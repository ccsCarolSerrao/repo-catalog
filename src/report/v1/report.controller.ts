import { Body, Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportService } from '../report.service';
import { ReportRequest } from './dtos/report.request';

@ApiTags('reports')
@Controller('v1/reports')
@UsePipes(new ValidationPipe({ transform: true }))
export class ReportController {
    constructor(private readonly _reportService: ReportService) {}

    @Get('teams/:team')
    @ApiOperation({ summary: 'Build team maturity level report' })
    async getByTeam(@Param('team') team: string, @Body() reportRequest: ReportRequest) {
        return this._reportService.getReportByTeam(team, reportRequest);
    }
}
