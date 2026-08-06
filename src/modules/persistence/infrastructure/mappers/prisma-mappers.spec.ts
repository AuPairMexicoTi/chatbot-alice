import { PrismaAiRunMapper } from './prisma-ai-run.mapper';
import { PrismaContactMapper } from './prisma-contact.mapper';
import { PrismaConversationMapper } from './prisma-conversation.mapper';
import { PrismaHandoffMapper } from './prisma-handoff.mapper';
import { PrismaMessageMapper } from './prisma-message.mapper';
import { PrismaWebhookEventMapper } from './prisma-webhook-event.mapper';

describe('Prisma mappers', () => {
  const now = new Date('2026-08-06T00:00:00.000Z');

  it('maps contact records', () => {
    const result = PrismaContactMapper.toDomain({
      id: '1',
      externalId: 'ext-1',
      name: 'Alice',
      phoneNumber: '5215550000001',
      createdAt: now,
      updatedAt: now,
    });

    expect(result.externalId).toBe('ext-1');
  });

  it('maps conversation records', () => {
    const result = PrismaConversationMapper.toDomain({
      id: '1',
      contactId: 'contact-1',
      status: 'OPEN',
      locale: 'es-MX',
      createdAt: now,
      updatedAt: now,
    });

    expect(result.status).toBe('OPEN');
  });

  it('maps message records', () => {
    const result = PrismaMessageMapper.toDomain({
      id: '1',
      conversationId: 'conversation-1',
      direction: 'INBOUND',
      type: 'TEXT',
      providerMessageId: 'wamid.1',
      text: 'hola',
      status: 'RECEIVED',
      metadata: { source: 'test' },
      createdAt: now,
      updatedAt: now,
    });

    expect(result.metadata.source).toBe('test');
  });

  it('maps webhook records', () => {
    const result = PrismaWebhookEventMapper.toDomain({
      id: '1',
      externalId: 'wamid.1',
      provider: 'WHATSAPP',
      eventType: 'text',
      status: 'QUEUED',
      payload: {},
      headers: { foo: 'bar' },
      createdAt: now,
      updatedAt: now,
    });

    expect(result.headers.foo).toBe('bar');
  });

  it('maps ai run records', () => {
    const result = PrismaAiRunMapper.toDomain({
      id: '1',
      conversationId: 'conversation-1',
      provider: 'mock',
      model: 'mock-alice',
      providerResponseId: null,
      status: 'COMPLETED',
      inputTokens: null,
      outputTokens: null,
      totalTokens: null,
      error: null,
      createdAt: now,
      completedAt: now,
    });

    expect(result.status).toBe('COMPLETED');
  });

  it('maps handoff records', () => {
    const result = PrismaHandoffMapper.toDomain({
      id: '1',
      conversationId: 'conversation-1',
      status: 'OPEN',
      reason: null,
      assignedAgentId: null,
      requestedAt: now,
      acceptedAt: null,
      closedAt: null,
      createdAt: now,
      updatedAt: now,
    });

    expect(result.status).toBe('OPEN');
  });
});
