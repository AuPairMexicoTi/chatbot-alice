import {
  ConversationFlowStateRecord,
  ConversationFlowStateRepository,
} from './ports/conversation-flow-state.repository';
import { ConversationFlowStateService } from './conversation-flow-state.service';

describe('ConversationFlowStateService', () => {
  const now = new Date('2026-09-01T15:00:00.000Z');
  const textInput = { text: 'hola', messageType: 'TEXT' as const };

  const repositoryWith = (
    record: ConversationFlowStateRecord | null,
  ): ConversationFlowStateRepository & { save: jest.Mock } => ({
    findByConversationId: jest.fn().mockResolvedValue(record),
    save: jest.fn().mockResolvedValue(undefined),
  });

  it('restarts a flow after 30 minutes of inactivity', async () => {
    const repository = repositoryWith({
      state: {
        nodeId: 'requirements',
        status: 'ACTIVE',
        attempts: 0,
        variables: {},
      },
      updatedAt: new Date('2026-09-01T14:29:59.999Z'),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.messages[0]).toContain('bienvenida');
  });

  it('continues an active flow before the inactivity timeout', async () => {
    const repository = repositoryWith({
      state: {
        nodeId: 'requirements',
        status: 'ACTIVE',
        attempts: 0,
        variables: {},
      },
      updatedAt: new Date('2026-09-01T14:30:00.001Z'),
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('requirements');
    expect(result.messages[0]).toContain('No entendí');
  });

  it('evaluates the first non-greeting reply instead of repeating the welcome', async () => {
    const repository = repositoryWith(null);
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', {
      text: 'Y',
      messageType: 'TEXT',
    });

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toContain('No entendí');
    expect(result.messages[0]).not.toContain('bienvenida');
  });

  it('restarts a finished flow when the candidate sends another message', async () => {
    const repository = repositoryWith({
      state: {
        nodeId: 'advisor-confirmation',
        status: 'AWAITING_HUMAN',
        attempts: 0,
        variables: {},
      },
      updatedAt: now,
    });
    const service = new ConversationFlowStateService(
      repository,
      30 * 60 * 1000,
      () => now,
    );

    const result = await service.advance('conversation-1', textInput);

    expect(result.state.nodeId).toBe('main-menu');
    expect(result.state.status).toBe('ACTIVE');
    expect(result.messages[0]).toContain('bienvenida');
  });
});
