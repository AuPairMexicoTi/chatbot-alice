import { ConfigService } from '@nestjs/config';
import { MetaWebhookVerifierService } from './meta-webhook-verifier.service';
import { createHmac } from 'node:crypto';

const createConfigService = (validateSignature: boolean): ConfigService =>
  new ConfigService({
    whatsapp: {
      verifyToken: 'test-token',
      validateSignature,
      appSecret: 'super-secret',
    },
  });

describe('MetaWebhookVerifierService', () => {
  it('verifies a valid challenge', () => {
    const service = new MetaWebhookVerifierService(createConfigService(false));
    expect(service.verifyChallenge('subscribe', 'test-token', 'abc')).toBe(
      'abc',
    );
  });

  it('rejects an invalid challenge token', () => {
    const service = new MetaWebhookVerifierService(createConfigService(false));
    expect(
      service.verifyChallenge('subscribe', 'wrong-token', 'abc'),
    ).toBeNull();
  });

  it('accepts a valid hmac signature', () => {
    const body = Buffer.from('{"hello":"world"}');
    const signature = createHmac('sha256', 'super-secret')
      .update(body)
      .digest('hex');
    const service = new MetaWebhookVerifierService(createConfigService(true));

    expect(
      service.verifySignature({
        rawBody: body,
        signatureHeader: `sha256=${signature}`,
      }),
    ).toBe(true);
  });

  it('rejects an invalid hmac signature', () => {
    const service = new MetaWebhookVerifierService(createConfigService(true));
    expect(
      service.verifySignature({
        rawBody: Buffer.from('{"hello":"world"}'),
        signatureHeader: 'sha256=deadbeef',
      }),
    ).toBe(false);
  });
});
