export interface HealthDependency {
  readonly name: string;
  check(): Promise<{ status: 'up' | 'down' }>;
}

export const DATABASE_HEALTH = Symbol('DATABASE_HEALTH');
export const REDIS_HEALTH = Symbol('REDIS_HEALTH');
