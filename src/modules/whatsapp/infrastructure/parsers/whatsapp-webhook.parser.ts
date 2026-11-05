import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { JsonValue } from '@shared/domain/types/json.type';
import type { FlowInput } from '@modules/conversation-flow/domain/conversation-flow.types';

export interface ParsedWhatsAppStatusUpdate {
  providerMessageId: string;
  status: string;
  errorCode: number | null;
  errorTitle: string | null;
}

export interface ParsedWhatsAppWebhook {
  externalId: string;
  eventType: string;
  contactExternalId: string | null;
  contactName: string | null;
  from: string | null;
  messageId: string | null;
  messageType: FlowInput['messageType'];
  text: string | null;
  locale: string;
  payload: JsonValue;
  // Callback asincrono de Meta (sent/delivered/read/failed) para un mensaje
  // saliente ya enviado -- no es un mensaje nuevo de la candidata, asi que
  // no trae contacto/texto. Ver receive-whatsapp-webhook.use-case.ts.
  statusUpdate: ParsedWhatsAppStatusUpdate | null;
}

@Injectable()
export class WhatsAppWebhookParser {
  parse(payload: JsonValue): ParsedWhatsAppWebhook {
    const value = this.getFirstChangeValue(payload);
    const contact = value?.contacts?.[0];
    const message = value?.messages?.[0];
    const status = message ? undefined : value?.statuses?.[0];

    const statusUpdate: ParsedWhatsAppStatusUpdate | null =
      status?.id && status?.status
        ? {
            providerMessageId: status.id,
            status: status.status,
            errorCode: status.errors?.[0]?.code ?? null,
            errorTitle: status.errors?.[0]?.title ?? null,
          }
        : null;

    // El mismo wamid pasa por varios estatus (sent -> delivered -> read, o
    // sent -> failed) a lo largo del tiempo -- sin el estatus y el timestamp
    // en el externalId, el segundo callback se tomaria como un duplicado del
    // primero y nunca se procesaria (ver findByExternalId en
    // receive-whatsapp-webhook.use-case.ts).
    const externalId =
      message?.id ??
      (statusUpdate
        ? `${statusUpdate.providerMessageId}:${statusUpdate.status}:${status?.timestamp ?? ''}`
        : createHash('sha256').update(JSON.stringify(payload)).digest('hex'));

    return {
      externalId,
      eventType: statusUpdate ? 'status' : (message?.type ?? 'unknown'),
      contactExternalId: contact?.wa_id ?? message?.from ?? null,
      contactName: contact?.profile?.name ?? null,
      from: message?.from ?? null,
      messageId: message?.id ?? null,
      messageType: this.messageType(message?.type),
      text: message?.text?.body ?? null,
      locale: 'es-MX',
      payload,
      statusUpdate,
    };
  }

  private messageType(type: string | undefined): FlowInput['messageType'] {
    const types: Record<string, FlowInput['messageType']> = {
      text: 'TEXT',
      image: 'IMAGE',
      audio: 'AUDIO',
      video: 'VIDEO',
      document: 'DOCUMENT',
      location: 'LOCATION',
      sticker: 'STICKER',
    };

    return types[type ?? ''] ?? 'UNKNOWN';
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
        statuses?: Array<{
          id?: string;
          status?: string;
          timestamp?: string;
          errors?: Array<{ code?: number; title?: string }>;
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
