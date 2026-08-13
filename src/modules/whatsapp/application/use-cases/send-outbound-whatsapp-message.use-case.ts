import { Inject, Injectable } from '@nestjs/common';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import {
  CONTACT_REPOSITORY,
  ContactRepository,
} from '@modules/contacts/application/ports/contact.repository';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from '@modules/conversations/application/ports/conversation.repository';
import {
  WHATSAPP_GATEWAY,
  WhatsAppGateway,
} from '../../domain/whatsapp-gateway';
import { ApplicationError } from '@shared/domain/errors/application.error';

@Injectable()
export class SendOutboundWhatsAppMessageUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: ContactRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
    @Inject(WHATSAPP_GATEWAY)
    private readonly whatsAppGateway: WhatsAppGateway,
  ) {}

  async execute(messageId: string): Promise<void> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new ApplicationError('MESSAGE_NOT_FOUND', 'Message not found', 404);
    }

    const conversation = await this.conversationRepository.findById(
      message.conversationId,
    );
    if (!conversation) {
      throw new ApplicationError(
        'CONVERSATION_NOT_FOUND',
        'Conversation not found',
        404,
      );
    }

    const contact = await this.contactRepository.findById(
      conversation.contactId,
    );
    if (!contact) {
      throw new ApplicationError('CONTACT_NOT_FOUND', 'Contact not found', 404);
    }

    const result =
      message.type === 'IMAGE'
        ? await this.whatsAppGateway.sendImageMessage({
            to: contact.phoneNumber,
            imageUrl: this.getRequiredImageUrl(message.metadata),
            caption: message.text ?? undefined,
          })
        : await this.whatsAppGateway.sendTextMessage({
            to: contact.phoneNumber,
            text: this.getRequiredText(message.text),
          });

    await this.messageRepository.updateStatus(
      messageId,
      'SENT',
      result.externalMessageId,
    );
  }

  private getRequiredText(text: string | null): string {
    if (!text) {
      throw new ApplicationError('MESSAGE_NOT_FOUND', 'Message not found', 404);
    }

    return text;
  }

  private getRequiredImageUrl(
    metadata: Record<string, string | number | boolean | null>,
  ): string {
    const imageUrl = metadata.imageUrl;

    if (typeof imageUrl !== 'string' || imageUrl.length === 0) {
      throw new ApplicationError(
        'IMAGE_URL_NOT_FOUND',
        'Image URL not found',
        400,
      );
    }

    return imageUrl;
  }
}
