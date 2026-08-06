import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { HealthDependency } from '../application/ports/health.port';

@Injectable()
export class DatabaseHealthService implements HealthDependency {
  readonly name = 'database';

  constructor(private readonly prismaService: PrismaService) {}

  async check(): Promise<{ status: 'up' | 'down' }> {
    await this.prismaService.$queryRaw`SELECT 1`;
    return { status: 'up' };
  }
}
