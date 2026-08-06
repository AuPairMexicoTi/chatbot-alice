export interface QueueInboundJobInput {
  webhookEventId: string;
  externalId: string;
}

export interface QueueOutboundJobInput {
  messageId: string;
}

export interface InboundQueuePort {
  enqueue(input: QueueInboundJobInput): Promise<void>;
}

export interface OutboundQueuePort {
  enqueue(input: QueueOutboundJobInput): Promise<void>;
}

export const INBOUND_QUEUE_PORT = Symbol('INBOUND_QUEUE_PORT');
export const OUTBOUND_QUEUE_PORT = Symbol('OUTBOUND_QUEUE_PORT');
