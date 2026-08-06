export interface SendTextMessageInput {
  to: string;
  text: string;
}

export interface SendMessageResult {
  externalMessageId: string;
  status: 'SENT' | 'QUEUED';
}

export interface WhatsAppGateway {
  sendTextMessage(input: SendTextMessageInput): Promise<SendMessageResult>;
}

export const WHATSAPP_GATEWAY = Symbol('WHATSAPP_GATEWAY');
