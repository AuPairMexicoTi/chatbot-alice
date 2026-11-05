export type ConversationPurgeCounts = {
  conversations: number;
  messages: number;
  contacts: number;
};

export interface DataRetentionRepository {
  // Solo lectura: lo que purgaria la corrida, para el modo simulacion.
  previewConversationPurge(
    inactiveBefore: Date,
  ): Promise<ConversationPurgeCounts>;
  countWebhookEventsCreatedBefore(createdBefore: Date): Promise<number>;

  // Cada lote es una transaccion. Devuelven cero cuando ya no queda nada que
  // se pueda borrar; las filas bloqueadas por otra transaccion se omiten y
  // se reevaluan en la siguiente corrida.
  purgeConversationBatch(
    inactiveBefore: Date,
    batchSize: number,
  ): Promise<ConversationPurgeCounts>;
  purgeWebhookEventBatch(
    createdBefore: Date,
    batchSize: number,
  ): Promise<number>;
}

export const DATA_RETENTION_REPOSITORY = Symbol('DATA_RETENTION_REPOSITORY');
