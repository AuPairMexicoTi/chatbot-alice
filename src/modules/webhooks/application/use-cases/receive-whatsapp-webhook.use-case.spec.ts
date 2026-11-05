import { ReceiveWhatsAppWebhookUseCase } from './receive-whatsapp-webhook.use-case';
import { InMemoryWebhookEventRepository } from '@modules/persistence/infrastructure/repositories/in-memory-webhook-event.repository';
import { InMemoryMessageRepository } from '@modules/persistence/infrastructure/repositories/in-memory-message.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { InMemoryQueueAdapter } from '@modules/whatsapp/infrastructure/adapters/in-memory-queue.adapter';
import { WhatsAppWebhookParser } from '@modules/whatsapp/infrastructure/parsers/whatsapp-webhook.parser';
import fixture from '../../../../../test/fixtures/whatsapp/text-message.json';
import statusFailedFixture from '../../../../../test/fixtures/whatsapp/status-failed.json';

describe('ReceiveWhatsAppWebhookUseCase', () => {
  const build = () => {
    const store = new InMemoryStore();
    const webhookEventRepository = new InMemoryWebhookEventRepository(store);
    const messageRepository = new InMemoryMessageRepository(store);
    const queue = new InMemoryQueueAdapter();
    const useCase = new ReceiveWhatsAppWebhookUseCase(
      new WhatsAppWebhookParser(),
      webhookEventRepository,
      queue,
      messageRepository,
    );
    return { store, webhookEventRepository, messageRepository, queue, useCase };
  };

  it('is idempotent for the same external id', async () => {
    const { queue, useCase } = build();

    const first = await useCase.execute(fixture, {});
    const second = await useCase.execute(fixture, {});

    expect(first.idempotent).toBe(false);
    expect(second.idempotent).toBe(true);
    expect(queue.inboundJobs).toHaveLength(1);
  });

  it('marks the matching outbound message as FAILED on a failed delivery status, without queueing it as an inbound message', async () => {
    const { store, messageRepository, queue, useCase } = build();
    const message = await messageRepository.create({
      conversationId: 'conv-1',
      direction: 'OUTBOUND',
      type: 'TEXT',
      providerMessageId: 'wamid.TEST-STATUS-1',
      text: 'No entendí tu respuesta...',
      status: 'SENT',
      metadata: { responseSource: 'CONVERSATION_FLOW' },
    });

    const result = await useCase.execute(statusFailedFixture, {});

    const updated = await messageRepository.findById(message.id);
    expect(result.idempotent).toBe(false);
    expect(queue.inboundJobs).toHaveLength(0);
    expect(updated?.status).toBe('FAILED');
    expect(updated?.metadata).toMatchObject({
      responseSource: 'CONVERSATION_FLOW',
      failure_code: 131042,
      failure_title: 'Business eligibility payment issue',
    });
    expect(store.webhooks.size).toBe(1);
    expect([...store.webhooks.values()][0].status).toBe('PROCESSED');
  });

  it('does not throw when a failed status references an unknown provider message id', async () => {
    const { queue, useCase } = build();

    const result = await useCase.execute(statusFailedFixture, {});

    expect(result.accepted).toBe(true);
    expect(queue.inboundJobs).toHaveLength(0);
  });
});
