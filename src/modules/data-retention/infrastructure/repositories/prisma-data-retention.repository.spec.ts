import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { PrismaDataRetentionRepository } from './prisma-data-retention.repository';

const cutoff = new Date('2026-10-12T09:00:00.000Z');

const buildPrisma = (
  selected: Array<{ id: string; contact_id: string }>,
  contactsDeleted = 0,
) => {
  const calls: string[] = [];
  const deleteMany = (name: string, count: number) =>
    jest.fn(() => {
      calls.push(name);
      return Promise.resolve({ count });
    });

  const tx = {
    $queryRaw: jest.fn(() => Promise.resolve(selected)),
    $executeRaw: jest.fn(() => {
      calls.push('contact');
      return Promise.resolve(contactsDeleted);
    }),
    toolExecution: { deleteMany: deleteMany('toolExecution', 0) },
    aiRun: { deleteMany: deleteMany('aiRun', 0) },
    handoff: { deleteMany: deleteMany('handoff', 0) },
    message: { deleteMany: deleteMany('message', 5) },
    conversation: { deleteMany: deleteMany('conversation', selected.length) },
  };
  const prisma = {
    $transaction: jest.fn((callback: (client: typeof tx) => Promise<unknown>) =>
      callback(tx),
    ),
  };

  return {
    calls,
    tx,
    repository: new PrismaDataRetentionRepository(
      prisma as unknown as PrismaService,
    ),
  };
};

describe('PrismaDataRetentionRepository', () => {
  it('deletes children before the conversation and the contact last', async () => {
    const { calls, repository } = buildPrisma(
      [
        { id: 'conversation-1', contact_id: 'contact-1' },
        { id: 'conversation-2', contact_id: 'contact-2' },
      ],
      2,
    );

    const result = await repository.purgeConversationBatch(cutoff, 200);

    expect(calls).toEqual([
      'toolExecution',
      'aiRun',
      'handoff',
      'message',
      'conversation',
      'contact',
    ]);
    expect(result).toEqual({ conversations: 2, messages: 5, contacts: 2 });
  });

  it('skips row-locked conversations and only targets the selected ones', async () => {
    const { tx, repository } = buildPrisma([
      { id: 'conversation-1', contact_id: 'contact-1' },
    ]);

    await repository.purgeConversationBatch(cutoff, 200);

    const [query] = tx.$queryRaw.mock.calls[0] as unknown as [
      TemplateStringsArray,
    ];
    expect(query.join('?')).toContain('FOR UPDATE SKIP LOCKED');
    expect(tx.message.deleteMany).toHaveBeenCalledWith({
      where: { conversationId: { in: ['conversation-1'] } },
    });
  });

  it('deletes nothing when no conversation can be selected', async () => {
    const { calls, repository } = buildPrisma([]);

    const result = await repository.purgeConversationBatch(cutoff, 200);

    expect(calls).toEqual([]);
    expect(result).toEqual({ conversations: 0, messages: 0, contacts: 0 });
  });
});
