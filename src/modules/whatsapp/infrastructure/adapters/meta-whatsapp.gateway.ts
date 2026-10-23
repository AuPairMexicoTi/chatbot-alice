import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SendImageMessageInput,
  SendMessageResult,
  SendTextMessageInput,
  SendTemplateMessageInput,
  WhatsAppGateway,
} from '../../domain/whatsapp-gateway';

@Injectable()
export class MetaWhatsAppGateway implements WhatsAppGateway {
  constructor(private readonly configService: ConfigService) {}

  private buildMessagesUrl(): URL {
    return new URL(
      `/${this.configService.getOrThrow<string>('whatsapp.graphApiVersion')}/${this.configService.getOrThrow<string>('whatsapp.phoneNumberId')}/messages`,
      this.configService.getOrThrow<string>('whatsapp.graphApiBaseUrl'),
    );
  }

  private async sendMessage(
    body: Record<string, unknown>,
  ): Promise<SendMessageResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(this.buildMessagesUrl(), {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.configService.getOrThrow<string>('whatsapp.accessToken')}`,
        },
        body: JSON.stringify(body),
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

  async sendTextMessage(
    input: SendTextMessageInput,
  ): Promise<SendMessageResult> {
    return this.sendMessage({
      messaging_product: 'whatsapp',
      to: this.normalizeRecipientPhoneNumber(input.to),
      type: 'text',
      text: {
        body: input.text,
      },
    });
  }

  async sendImageMessage(
    input: SendImageMessageInput,
  ): Promise<SendMessageResult> {
    return this.sendMessage({
      messaging_product: 'whatsapp',
      to: this.normalizeRecipientPhoneNumber(input.to),
      type: 'image',
      image: {
        link: input.imageUrl,
        caption: input.caption,
      },
    });
  }

  async sendTemplateMessage(
    input: SendTemplateMessageInput,
  ): Promise<SendMessageResult> {
    const components: Array<Record<string, unknown>> = [];

    if (input.bodyParameters.length > 0) {
      components.push({
        type: 'body',
        parameters: input.bodyParameters.map((text) => ({
          type: 'text',
          text,
        })),
      });
    }

    if (input.imageUrl) {
      components.unshift({
        type: 'header',
        parameters: [{ type: 'image', image: { link: input.imageUrl } }],
      });
    }

    return this.sendMessage({
      messaging_product: 'whatsapp',
      to: this.normalizeRecipientPhoneNumber(input.to),
      type: 'template',
      template: {
        name: input.templateName,
        language: { code: input.languageCode },
        ...(components.length > 0 ? { components } : {}),
      },
    });
  }

  private normalizeRecipientPhoneNumber(phoneNumber: string): string {
    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Meta's current Cloud API recipient format for Mexican mobile numbers
    // omits the legacy mobile "1" that may still be present in webhook wa_id.
    if (normalizedPhoneNumber.startsWith('521')) {
      return `52${normalizedPhoneNumber.slice(3)}`;
    }

    // Los leads de APM se almacenan con los diez dígitos nacionales. Meta
    // exige el formato internacional sin el signo "+" para sus destinatarios.
    if (/^\d{10}$/u.test(normalizedPhoneNumber)) {
      return `52${normalizedPhoneNumber}`;
    }

    return normalizedPhoneNumber;
  }
}
