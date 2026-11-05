import { buildRetentionCutoffs } from './retention-cutoffs';

describe('buildRetentionCutoffs', () => {
  const windows = { conversationMonths: 6, webhookDays: 30 };

  it('subtracts calendar months for conversations and days for webhooks', () => {
    const cutoffs = buildRetentionCutoffs(
      new Date('2027-04-12T09:00:00.000Z'),
      windows,
    );

    expect(cutoffs.conversationsInactiveBefore).toEqual(
      new Date('2026-10-12T09:00:00.000Z'),
    );
    expect(cutoffs.webhookEventsCreatedBefore).toEqual(
      new Date('2027-03-13T09:00:00.000Z'),
    );
  });

  it('clamps to the last day when the target month is shorter', () => {
    const cutoffs = buildRetentionCutoffs(
      new Date('2027-08-31T09:00:00.000Z'),
      windows,
    );

    expect(cutoffs.conversationsInactiveBefore).toEqual(
      new Date('2027-02-28T09:00:00.000Z'),
    );
  });

  it('crosses the year boundary', () => {
    const cutoffs = buildRetentionCutoffs(
      new Date('2027-01-15T09:00:00.000Z'),
      windows,
    );

    expect(cutoffs.conversationsInactiveBefore).toEqual(
      new Date('2026-07-15T09:00:00.000Z'),
    );
  });
});
