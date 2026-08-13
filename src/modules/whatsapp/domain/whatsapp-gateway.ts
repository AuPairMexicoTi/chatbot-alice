export interface SendTextMessageInput {
  to: string;
  text: string;
}

export interface SendImageMessageInput {
  to: string;
  imageUrl: string;
  caption?: string;
}

export interface SendMessageResult {
  externalMessageId: string;
  status: 'SENT' | 'QUEUED';
}

export interface WhatsAppGateway {
  sendTextMessage(input: SendTextMessageInput): Promise<SendMessageResult>;
  sendImageMessage(input: SendImageMessageInput): Promise<SendMessageResult>;
}

export const WHATSAPP_GATEWAY = Symbol('WHATSAPP_GATEWAY');
