import { ReceiveWhatsAppWebhookUseCase } from './receive-whatsapp-webhook.use-case';
import { InMemoryWebhookEventRepository } from '@modules/persistence/infrastructure/repositories/in-memory-webhook-event.repository';
import { InMemoryStore } from '@modules/persistence/infrastructure/repositories/in-memory.store';
import { InMemoryQueueAdapter } from '@modules/whatsapp/infrastructure/adapters/in-memory-queue.adapter';
import { WhatsAppWebhookParser } from '@modules/whatsapp/infrastructure/parsers/whatsapp-webhook.parser';
import fixture from '../../../../../test/fixtures/whatsapp/text-message.json';

describe('ReceiveWhatsAppWebhookUseCase', () => {
  it('is idempotent for the same external id', async () => {
    const repository = new InMemoryWebhookEventRepository(new InMemoryStore());
    const queue = new InMemoryQueueAdapter();
    const useCase = new ReceiveWhatsAppWebhookUseCase(
      new WhatsAppWebhookParser(),
      repository,
      queue,
    );

    const first = await useCase.execute(fixture, {});
    const second = await useCase.execute(fixture, {});

    expect(first.idempotent).toBe(false);
    expect(second.idempotent).toBe(true);
    expect(queue.inboundJobs).toHaveLength(1);
  });
});
