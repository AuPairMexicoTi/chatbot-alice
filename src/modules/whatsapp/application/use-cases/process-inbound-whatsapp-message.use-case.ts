import { Inject, Injectable } from '@nestjs/common';
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
import { ResolveAutoReplyUseCase } from '@modules/auto-replies/application/use-cases/resolve-auto-reply.use-case';
import { QueueOutboundMessageUseCase } from './queue-outbound-message.use-case';
import { GenerateConversationReplyUseCase } from './generate-conversation-reply.use-case';
import { ParsedWhatsAppWebhook } from '../../infrastructure/parsers/whatsapp-webhook.parser';

@Injectable()
export class ProcessInboundWhatsAppMessageUseCase {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: ContactRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly resolveAutoReplyUseCase: ResolveAutoReplyUseCase,
    private readonly generateConversationReplyUseCase: GenerateConversationReplyUseCase,
    private readonly queueOutboundMessageUseCase: QueueOutboundMessageUseCase,
  ) {}

  async execute(payload: ParsedWhatsAppWebhook): Promise<void> {
    if (!payload.contactExternalId || !payload.from) {
      return;
    }

    const contact = await this.contactRepository.upsert({
      externalId: payload.contactExternalId,
      name: payload.contactName,
      phoneNumber: payload.from,
    });

    const conversation =
      await this.conversationRepository.getOrCreateByContactId(
        contact.id,
        payload.locale,
      );

    await this.messageRepository.create({
      conversationId: conversation.id,
      direction: 'INBOUND',
      type: payload.messageType,
      providerMessageId: payload.messageId,
      text: payload.text,
      status: 'RECEIVED',
      metadata: {},
    });

    if (payload.messageType === 'UNKNOWN') {
      return;
    }

    const autoReply = await this.resolveAutoReplyUseCase.execute(
      payload.text,
      conversation.locale,
    );

    if (autoReply) {
      const outboundMessage = await this.messageRepository.create({
        conversationId: conversation.id,
        direction: 'OUTBOUND',
        type: 'TEXT',
        providerMessageId: null,
        text: autoReply.text,
        status: 'QUEUED',
        metadata: {
          responseSource: 'AUTO_REPLY',
          autoReplyId: autoReply.id,
          autoReplyKey: autoReply.key,
        },
      });

      await this.queueOutboundMessageUseCase.execute(outboundMessage.id);
      return;
    }

    const aiResult = await this.generateConversationReplyUseCase.execute(
      conversation.id,
    );

    const outboundMessage = await this.messageRepository.create({
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      type: 'TEXT',
      providerMessageId: null,
      text: aiResult.text,
      status: 'QUEUED',
      metadata: {},
    });

    await this.queueOutboundMessageUseCase.execute(outboundMessage.id);
  }
}
