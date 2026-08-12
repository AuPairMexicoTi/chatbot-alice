import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AiRun } from '@modules/ai/domain/ai-run.entity';
import { AutoReply } from '@modules/auto-replies/domain/auto-reply.entity';
import { Contact } from '@modules/contacts/domain/contact.entity';
import { Conversation } from '@modules/conversations/domain/conversation.entity';
import { Handoff } from '@modules/handoff/domain/handoff.entity';
import { Message } from '@modules/messaging/domain/message.entity';
import { WebhookEvent } from '@modules/webhooks/domain/webhook-event.entity';

@Injectable()
export class InMemoryStore {
  readonly contacts = new Map<string, Contact>();
  readonly conversations = new Map<string, Conversation>();
  readonly messages = new Map<string, Message>();
  readonly webhooks = new Map<string, WebhookEvent>();
  readonly aiRuns = new Map<string, AiRun>();
  readonly handoffs = new Map<string, Handoff>();
  readonly autoReplies = new Map<string, AutoReply>();

  nextId(): string {
    return randomUUID();
  }
}
