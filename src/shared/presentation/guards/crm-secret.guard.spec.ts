import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrmSecretGuard } from './crm-secret.guard';

describe('CrmSecretGuard', () => {
  const buildContext = (headers: Record<string, string>): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    }) as unknown as ExecutionContext;

  const buildConfigService = (secret: string): ConfigService =>
    ({
      get: (key: string) => (key === 'crm.webhookSecret' ? secret : undefined),
    }) as unknown as ConfigService;

  it('allows the request when the header matches the configured secret', () => {
    const guard = new CrmSecretGuard(buildConfigService('shared-secret'));

    const result = guard.canActivate(
      buildContext({ 'x-alice-secret': 'shared-secret' }),
    );

    expect(result).toBe(true);
  });

  it('rejects the request when the header does not match', () => {
    const guard = new CrmSecretGuard(buildConfigService('shared-secret'));

    expect(() =>
      guard.canActivate(buildContext({ 'x-alice-secret': 'wrong' })),
    ).toThrow(ForbiddenException);
  });

  it('rejects the request when the header is missing', () => {
    const guard = new CrmSecretGuard(buildConfigService('shared-secret'));

    expect(() => guard.canActivate(buildContext({}))).toThrow(
      ForbiddenException,
    );
  });

  it('rejects when no secret is configured, even with a matching empty header', () => {
    const guard = new CrmSecretGuard(buildConfigService(''));

    expect(() =>
      guard.canActivate(buildContext({ 'x-alice-secret': '' })),
    ).toThrow(ForbiddenException);
  });
});
