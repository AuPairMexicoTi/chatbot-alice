import { Injectable } from '@nestjs/common';
import { RedisService } from '@shared/infrastructure/redis/redis.service';
import { HealthDependency } from '../application/ports/health.port';

@Injectable()
export class RedisHealthService implements HealthDependency {
  readonly name = 'redis';

  constructor(private readonly redisService: RedisService) {}

  async check(): Promise<{ status: 'up' | 'down' }> {
    await this.redisService.ping();
    return { status: 'up' };
  }
}
