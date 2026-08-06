import { Inject, Injectable } from '@nestjs/common';
import { ApplicationError } from '@shared/domain/errors/application.error';
import {
  CONVERSATION_REPOSITORY,
  ConversationRepository,
} from '@modules/conversations/application/ports/conversation.repository';
import {
  HANDOFF_REPOSITORY,
  HandoffRepository,
} from '@modules/handoff/application/ports/handoff.repository';

@Injectable()
export class RequestHumanHandoffUseCase {
  constructor(
    @Inject(HANDOFF_REPOSITORY)
    private readonly handoffRepository: HandoffRepository,
    @Inject(CONVERSATION_REPOSITORY)
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async execute(
    conversationId: string,
    reason: string | null,
  ): Promise<{ handoffId: string; status: string }> {
    const existing =
      await this.handoffRepository.findOpenByConversationId(conversationId);

    if (existing) {
      return {
        handoffId: existing.id,
        status: existing.status,
      };
    }

    const conversation =
      await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new ApplicationError(
        'CONVERSATION_NOT_FOUND',
        'Conversation not found',
        404,
      );
    }

    await this.conversationRepository.updateStatus(
      conversationId,
      'WAITING_HUMAN',
    );
    const handoff = await this.handoffRepository.create(conversationId, reason);

    return {
      handoffId: handoff.id,
      status: handoff.status,
    };
  }
}
