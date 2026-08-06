import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HealthService } from '../application/health.service';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  getLiveness(): { status: 'ok' } {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  async getReadiness(): Promise<{
    status: 'ok' | 'error';
    info: Record<string, { status: 'up' | 'down' }>;
  }> {
    return this.healthService.getReadiness();
  }
}
