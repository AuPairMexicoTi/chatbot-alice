import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ReceiveWhatsAppWebhookUseCase } from '../application/use-cases/receive-whatsapp-webhook.use-case';
import { VerifyWhatsAppWebhookQueryDto } from './dto/verify-whatsapp-webhook-query.dto';
import { WhatsAppWebhookDto } from './dto/whatsapp-webhook.dto';
import { Inject } from '@nestjs/common';
import {
  WEBHOOK_VERIFIER,
  WebhookVerifier,
} from '@modules/whatsapp/application/ports/webhook-verifier';
import { JsonValue } from '@shared/domain/types/json.type';

@Controller('webhooks/whatsapp')
export class WhatsAppWebhookController {
  constructor(
    @Inject(WEBHOOK_VERIFIER)
    private readonly webhookVerifier: WebhookVerifier,
    private readonly receiveWhatsAppWebhookUseCase: ReceiveWhatsAppWebhookUseCase,
  ) {}

  @Get()
  verify(@Query() query: VerifyWhatsAppWebhookQueryDto): string {
    const result = this.webhookVerifier.verifyChallenge(
      query['hub.mode'],
      query['hub.verify_token'],
      query['hub.challenge'],
    );

    if (!result) {
      throw new ForbiddenException('Invalid webhook verification');
    }

    return result;
  }

  @Post()
  @HttpCode(200)
  async receive(
    @Req() request: Request & { rawBody?: Buffer },
    @Headers('x-hub-signature-256') signatureHeader: string | undefined,
    @Body() body: WhatsAppWebhookDto,
  ): Promise<{ received: true }> {
    const validSignature = this.webhookVerifier.verifySignature({
      rawBody: request.rawBody ?? Buffer.from(JSON.stringify(body)),
      signatureHeader,
    });

    if (!validSignature) {
      throw new ForbiddenException('Invalid webhook signature');
    }

    await this.receiveWhatsAppWebhookUseCase.execute(
      body as unknown as JsonValue,
      this.sanitizeHeaders(request.headers),
    );
    return { received: true };
  }

  private sanitizeHeaders(headers: Request['headers']): Record<string, string> {
    return Object.fromEntries(
      Object.entries(headers)
        .filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        )
        .filter(([key]) => key !== 'authorization' && key !== 'cookie'),
    );
  }
}
