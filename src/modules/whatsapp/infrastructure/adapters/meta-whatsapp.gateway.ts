import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SendMessageResult,
  SendTextMessageInput,
  WhatsAppGateway,
} from '../../domain/whatsapp-gateway';

@Injectable()
export class MetaWhatsAppGateway implements WhatsAppGateway {
  constructor(private readonly configService: ConfigService) {}

  async sendTextMessage(
    input: SendTextMessageInput,
  ): Promise<SendMessageResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const url = new URL(
        `/${this.configService.getOrThrow<string>('whatsapp.graphApiVersion')}/${this.configService.getOrThrow<string>('whatsapp.phoneNumberId')}/messages`,
        this.configService.getOrThrow<string>('whatsapp.graphApiBaseUrl'),
      );

      const response = await fetch(url, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.configService.getOrThrow<string>('whatsapp.accessToken')}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: input.to,
          type: 'text',
          text: {
            body: input.text,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Meta WhatsApp responded with ${response.status}: ${errorBody}`,
        );
      }

      const data = (await response.json()) as {
        messages?: Array<{ id: string }>;
      };

      return {
        externalMessageId: data.messages?.[0]?.id ?? 'unknown',
        status: 'SENT',
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
