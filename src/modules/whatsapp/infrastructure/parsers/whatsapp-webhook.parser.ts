import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { JsonValue } from '@shared/domain/types/json.type';

export interface ParsedWhatsAppWebhook {
  externalId: string;
  eventType: string;
  contactExternalId: string | null;
  contactName: string | null;
  from: string | null;
  messageId: string | null;
  messageType: 'TEXT' | 'UNKNOWN';
  text: string | null;
  locale: string;
  payload: JsonValue;
}

@Injectable()
export class WhatsAppWebhookParser {
  parse(payload: JsonValue): ParsedWhatsAppWebhook {
    const value = this.getFirstChangeValue(payload);
    const contact = value?.contacts?.[0];
    const message = value?.messages?.[0];

    const externalId =
      message?.id ??
      createHash('sha256').update(JSON.stringify(payload)).digest('hex');

    return {
      externalId,
      eventType: message?.type ?? 'unknown',
      contactExternalId: contact?.wa_id ?? message?.from ?? null,
      contactName: contact?.profile?.name ?? null,
      from: message?.from ?? null,
      messageId: message?.id ?? null,
      messageType: message?.type === 'text' ? 'TEXT' : 'UNKNOWN',
      text: message?.text?.body ?? null,
      locale: 'es-MX',
      payload,
    };
  }

  private getFirstChangeValue(payload: JsonValue):
    | {
        contacts?: Array<{ wa_id?: string; profile?: { name?: string } }>;
        messages?: Array<{
          id?: string;
          from?: string;
          type?: string;
          text?: { body?: string };
        }>;
      }
    | undefined {
    if (
      typeof payload !== 'object' ||
      payload === null ||
      Array.isArray(payload)
    ) {
      return undefined;
    }

    const entryRaw =
      'entry' in payload && Array.isArray(payload.entry)
        ? payload.entry[0]
        : undefined;
    const entry =
      typeof entryRaw === 'object' &&
      entryRaw !== null &&
      !Array.isArray(entryRaw)
        ? entryRaw
        : undefined;
    const changeRaw =
      entry && Array.isArray(entry.changes) ? entry.changes[0] : undefined;
    const change =
      typeof changeRaw === 'object' &&
      changeRaw !== null &&
      !Array.isArray(changeRaw) &&
      'value' in changeRaw
        ? changeRaw
        : undefined;

    if (!change) {
      return undefined;
    }

    const value = change.value;
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return undefined;
    }

    return value;
  }
}
