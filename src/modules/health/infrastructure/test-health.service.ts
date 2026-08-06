import { Injectable } from '@nestjs/common';
import { HealthDependency } from '../application/ports/health.port';

@Injectable()
export class TestHealthService implements HealthDependency {
  constructor(public readonly name: string) {}

  async check(): Promise<{ status: 'up' }> {
    return { status: 'up' };
  }
}
