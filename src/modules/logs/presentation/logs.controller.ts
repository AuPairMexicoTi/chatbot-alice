import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import { LogsService } from '../application/logs.service';
import { ListLogsQueryDto } from './dto/list-logs-query.dto';
import { LogsPageResponseDto } from './dto/logs-page-response.dto';

// Endpoint interno de solo lectura, consumido unicamente por el backend de
// APM (vista de IT en /it/logs) -- nunca por un frontend directamente. Ver
// ConversationsAdminController para el mismo patron.
@ApiTags('Logs (admin, internal)')
@Controller('logs')
@UseGuards(CrmSecretGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiOkResponse({ type: LogsPageResponseDto })
  list(@Query() query: ListLogsQueryDto): LogsPageResponseDto {
    const result = this.logsService.list(query);

    return {
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalEvents: result.totalEvents,
        lastPage: result.lastPage,
        files: result.files,
        levels: this.logsService.getLevels(),
      },
    };
  }
}
