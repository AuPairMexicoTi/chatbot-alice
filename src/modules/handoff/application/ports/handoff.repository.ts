import { Handoff } from '../../domain/handoff.entity';

export interface HandoffRepository {
  findOpenByConversationId(conversationId: string): Promise<Handoff | null>;
  create(conversationId: string, reason: string | null): Promise<Handoff>;
}

export const HANDOFF_REPOSITORY = Symbol('HANDOFF_REPOSITORY');
