import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import {
  SendImageMessageInput,
  SendMessageResult,
  SendTextMessageInput,
  SendTemplateMessageInput,
  WhatsAppGateway,
} from '../../domain/whatsapp-gateway';

@Injectable()
export class MockWhatsAppGateway implements WhatsAppGateway {
  async sendTextMessage(
    input: SendTextMessageInput,
  ): Promise<SendMessageResult> {
    const externalMessageId = createHash('sha256')
      .update(`${input.to}:${input.text}`)
      .digest('hex')
      .slice(0, 24);

    return {
      externalMessageId,
      status: 'SENT',
    };
  }

  async sendImageMessage(
    input: SendImageMessageInput,
  ): Promise<SendMessageResult> {
    const externalMessageId = createHash('sha256')
      .update(`${input.to}:${input.imageUrl}:${input.caption ?? ''}`)
      .digest('hex')
      .slice(0, 24);

    return {
      externalMessageId,
      status: 'SENT',
    };
  }

  async sendTemplateMessage(
    input: SendTemplateMessageInput,
  ): Promise<SendMessageResult> {
    const externalMessageId = createHash('sha256')
      .update(
        `${input.to}:${input.templateName}:${input.languageCode}:${input.bodyParameters.join(':')}:${input.imageUrl ?? ''}`,
      )
      .digest('hex')
      .slice(0, 24);

    return {
      externalMessageId,
      status: 'SENT',
    };
  }
}
