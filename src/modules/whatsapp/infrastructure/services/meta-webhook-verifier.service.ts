import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  VerifyWebhookSignatureInput,
  WebhookVerifier,
} from '../../application/ports/webhook-verifier';

@Injectable()
export class MetaWebhookVerifierService implements WebhookVerifier {
  constructor(private readonly configService: ConfigService) {}

  verifyChallenge(
    mode: string,
    verifyToken: string,
    challenge: string,
  ): string | null {
    const configuredToken = this.configService.getOrThrow<string>(
      'whatsapp.verifyToken',
    );

    if (mode === 'subscribe' && verifyToken === configuredToken) {
      return challenge;
    }

    return null;
  }

  verifySignature(input: VerifyWebhookSignatureInput): boolean {
    if (!this.configService.getOrThrow<boolean>('whatsapp.validateSignature')) {
      return true;
    }

    if (!input.signatureHeader?.startsWith('sha256=')) {
      return false;
    }

    const expected = createHmac(
      'sha256',
      this.configService.getOrThrow<string>('whatsapp.appSecret'),
    )
      .update(input.rawBody)
      .digest('hex');

    const received = input.signatureHeader.replace('sha256=', '');
    const expectedBuffer = Buffer.from(expected, 'hex');
    const receivedBuffer = Buffer.from(received, 'hex');

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, receivedBuffer);
  }
}
