import { Body, Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportService } from '../report.service';
import { ReportRequest } from './dtos/report.request';

@Controller('v1/reports')
@UsePipes(new ValidationPipe({ transform: true }))
export class ReportController {
    constructor(private readonly _reportService: ReportService) {}

    @Get('teams/:team')
    async getByTeam(@Param('team') team: string, @Body() reportRequest: ReportRequest) {
        return this._reportService.getReportByTeam(team, reportRequest);
    }
}
