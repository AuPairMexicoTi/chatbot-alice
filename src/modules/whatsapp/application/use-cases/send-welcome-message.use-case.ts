import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CONTACT_REPOSITORY,
  ContactRepository,
} from '@modules/contacts/application/ports/contact.repository';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from '@modules/conversations/application/ports/conversation.repository';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
} from '@modules/auto-replies/application/ports/auto-reply.repository';
import { ApplicationError } from '@shared/domain/errors/application.error';
import { QueueOutboundMessageUseCase } from './queue-outbound-message.use-case';

export const WELCOME_AUTO_REPLY_KEY = 'welcome_zapier_lead';

export interface SendWelcomeMessageInput {
  phoneNumber: string;
  name: string | null;
}

export interface SendWelcomeMessageResult {
  messageId: string;
}

@Injectable()
export class SendWelcomeMessageUseCase {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: ContactRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
    private readonly queueOutboundMessageUseCase: QueueOutboundMessageUseCase,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    input: SendWelcomeMessageInput,
  ): Promise<SendWelcomeMessageResult> {
    const template = await this.autoReplyRepository.findByKey(
      WELCOME_AUTO_REPLY_KEY,
    );

    if (!template || !template.isActive) {
      throw new ApplicationError(
        'WELCOME_TEMPLATE_NOT_FOUND',
        `No hay una plantilla activa con key "${WELCOME_AUTO_REPLY_KEY}".`,
        404,
      );
    }

    const contact = await this.contactRepository.upsert({
      externalId: input.phoneNumber,
      name: input.name,
      phoneNumber: input.phoneNumber,
    });

    const conversation =
      await this.conversationRepository.getOrCreateByContactId(
        contact.id,
        template.locale ?? 'es-MX',
      );

    const message = await this.messageRepository.create({
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      type: this.getWelcomeImageUrl(template.responseImageUrl)
        ? 'IMAGE'
        : 'TEXT',
      providerMessageId: null,
      text: this.applyTemplate(template.responseText, input.name),
      status: 'QUEUED',
      metadata: {
        responseSource: 'CRM_WELCOME',
        autoReplyId: template.id,
        autoReplyKey: template.key,
        ...(this.getWelcomeImageUrl(template.responseImageUrl)
          ? { imageUrl: this.getWelcomeImageUrl(template.responseImageUrl) }
          : {}),
      },
    });

    await this.queueOutboundMessageUseCase.execute(message.id);

    return { messageId: message.id };
  }

  private applyTemplate(text: string, name: string | null): string {
    const safeName = name && name.trim().length > 0 ? name.trim() : '';
    return text.replace(/\{\{\s*name\s*\}\}/gi, safeName);
  }

  private getWelcomeImageUrl(templateImageUrl: string | null): string | null {
    const publicBaseUrl = this.configService
      .get<string>('media.publicBaseUrl', '')
      .replace(/\/$/u, '');
    return publicBaseUrl
      ? `${publicBaseUrl}/api/v1/assets/principal.jpeg`
      : templateImageUrl;
  }
}
