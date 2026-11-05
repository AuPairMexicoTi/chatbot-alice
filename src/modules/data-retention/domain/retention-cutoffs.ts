const dayMs = 24 * 60 * 60 * 1000;

export type RetentionWindows = {
  conversationMonths: number;
  webhookDays: number;
};

export type RetentionCutoffs = {
  conversationsInactiveBefore: Date;
  webhookEventsCreatedBefore: Date;
};

// Date.setUTCMonth desborda al mes siguiente cuando el dia no existe (31 de
// agosto menos 6 meses daria 3 de marzo en vez de 28 de febrero), lo que
// recortaria la ventana de retencion. Se ajusta al ultimo dia del mes.
const subtractMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getTime());
  const day = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() - months);

  const lastDayOfMonth = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();
  result.setUTCDate(Math.min(day, lastDayOfMonth));

  return result;
};

export const buildRetentionCutoffs = (
  now: Date,
  windows: RetentionWindows,
): RetentionCutoffs => ({
  conversationsInactiveBefore: subtractMonths(now, windows.conversationMonths),
  webhookEventsCreatedBefore: new Date(
    now.getTime() - windows.webhookDays * dayMs,
  ),
});
