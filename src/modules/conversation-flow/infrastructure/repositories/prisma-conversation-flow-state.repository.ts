import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  ConversationFlowStateRecord,
  ConversationFlowStateRepository,
} from '../../application/ports/conversation-flow-state.repository';
import { FlowState } from '../../domain/conversation-flow.types';

export class PrismaConversationFlowStateRepository implements ConversationFlowStateRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByConversationId(
    conversationId: string,
  ): Promise<ConversationFlowStateRecord | null> {
    const item = await this.prisma.conversationFlowState.findUnique({
      where: { conversationId },
    });
    return item
      ? {
          state: {
            nodeId: item.nodeId,
            status: item.status as FlowState['status'],
            attempts: item.attempts,
            variables: item.variables as Record<string, string>,
          },
          updatedAt: item.updatedAt,
        }
      : null;
  }
  async save(conversationId: string, state: FlowState): Promise<void> {
    await this.prisma.conversationFlowState.upsert({
      where: { conversationId },
      create: {
        conversationId,
        nodeId: state.nodeId,
        status: state.status,
        attempts: state.attempts,
        variables: state.variables,
      },
      update: {
        nodeId: state.nodeId,
        status: state.status,
        attempts: state.attempts,
        variables: state.variables,
      },
    });
  }
}
