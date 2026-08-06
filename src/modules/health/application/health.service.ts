import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_HEALTH,
  HealthDependency,
  REDIS_HEALTH,
} from './ports/health.port';

@Injectable()
export class HealthService {
  constructor(
    @Inject(DATABASE_HEALTH)
    private readonly databaseHealth: HealthDependency,
    @Inject(REDIS_HEALTH)
    private readonly redisHealth: HealthDependency,
  ) {}

  getLiveness(): { status: 'ok' } {
    return { status: 'ok' };
  }

  async getReadiness(): Promise<{
    status: 'ok' | 'error';
    info: Record<string, { status: 'up' | 'down' }>;
  }> {
    const [database, redis] = await Promise.allSettled([
      this.databaseHealth.check(),
      this.redisHealth.check(),
    ]);

    const info = {
      database:
        database.status === 'fulfilled'
          ? database.value
          : { status: 'down' as const },
      redis:
        redis.status === 'fulfilled'
          ? redis.value
          : { status: 'down' as const },
    };

    return {
      status:
        info.database.status === 'up' && info.redis.status === 'up'
          ? 'ok'
          : 'error',
      info,
    };
  }
}
