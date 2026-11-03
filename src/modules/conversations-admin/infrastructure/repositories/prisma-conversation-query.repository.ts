import { Injectable } from '@nestjs/common';
import { Prisma } from '@generated/prisma';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  ConversationQueryPort,
  ListConversationsFilters,
  ListMessagesOptions,
  MessagesPage,
  Paginated,
} from '../../application/ports/conversation-query.port';
import { ConversationListItem } from '../../application/read-models/conversation-list-item.read-model';
import { ConversationDetail } from '../../application/read-models/conversation-detail.read-model';
import { MessageItem } from '../../application/read-models/message-item.read-model';
import { FlowStateItem } from '../../application/read-models/flow-state.read-model';

// Claves de `variables` del flujo que no deben salir por este endpoint (son
// dato de contacto capturado durante la conversacion, no solo estado del
// flujo) -- ver conversation-flow.engine.ts, nodo "capture-email".
const SENSITIVE_FLOW_VARIABLE_KEYS = new Set(['email']);

const toMetadataRecord = (value: Prisma.JsonValue): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};

const redactSensitiveVariables = (
  value: Prisma.JsonValue,
): Record<string, unknown> => {
  const variables = toMetadataRecord(value);
  const redacted: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(variables)) {
    if (!SENSITIVE_FLOW_VARIABLE_KEYS.has(key)) {
      redacted[key] = val;
    }
  }

  return redacted;
};

const conversationListInclude = {
  contact: true,
  messages: { orderBy: { createdAt: 'desc' as const }, take: 1 },
  handoffs: { orderBy: { requestedAt: 'desc' as const }, take: 1 },
} satisfies Prisma.ConversationInclude;

type ConversationWithListInclude = Prisma.ConversationGetPayload<{
  include: typeof conversationListInclude;
}>;

const toListItem = (
  record: ConversationWithListInclude,
): ConversationListItem => {
  const lastMessage = record.messages[0] ?? null;
  const latestHandoff = record.handoffs[0] ?? null;

  return {
    id: record.id,
    contactId: record.contactId,
    contactName: record.contact.name,
    phoneNumber: record.contact.phoneNumber,
    status: record.status,
    waitingOnHuman: record.status === 'WAITING_HUMAN',
    lastMessage: lastMessage?.text ?? null,
    lastMessageAt: lastMessage?.createdAt ?? null,
    assignedAdvisorId:
      latestHandoff && latestHandoff.status !== 'CLOSED'
        ? latestHandoff.assignedAgentId
        : null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
};

@Injectable()
export class PrismaConversationQueryRepository implements ConversationQueryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async list(
    filters: ListConversationsFilters,
  ): Promise<Paginated<ConversationListItem>> {
    // Prisma no puede expresar "el mensaje mas reciente de esta conversacion
    // es INBOUND" de forma declarativa en el where -- se resuelve aparte por
    // SQL (una vez, no por pagina) y se agrega como filtro de id, igual que
    // cualquier otro filtro de esta lista.
    const noReplyIds = filters.noReply
      ? await this.findConversationIdsWithoutReply()
      : null;

    const where: Prisma.ConversationWhereInput = {
      AND: [
        noReplyIds ? { id: { in: noReplyIds } } : {},
        filters.status ? { status: filters.status } : {},
        filters.dateFrom || filters.dateTo
          ? {
              createdAt: {
                ...(filters.dateFrom ? { gte: filters.dateFrom } : {}),
                ...(filters.dateTo ? { lte: filters.dateTo } : {}),
              },
            }
          : {},
        filters.search
          ? {
              contact: {
                OR: [
                  {
                    name: {
                      contains: filters.search,
                      mode: 'insensitive' as const,
                    },
                  },
                  { phoneNumber: { contains: filters.search } },
                ],
              },
            }
          : {},
        filters.assignedAdvisorId
          ? {
              handoffs: {
                some: {
                  assignedAgentId: filters.assignedAdvisorId,
                  status: { not: 'CLOSED' },
                },
              },
            }
          : {},
      ],
    };

    const skip = (filters.page - 1) * filters.limit;

    const [records, total] = await Promise.all([
      this.prismaService.conversation.findMany({
        where,
        include: conversationListInclude,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: filters.limit,
      }),
      this.prismaService.conversation.count({ where }),
    ]);

    return { data: records.map(toListItem), total };
  }

  // Una conversacion "sin respuesta" es aquella cuyo mensaje mas reciente es
  // INBOUND -- el lead escribio y nadie (bot, auto-reply ni humano) le
  // contesto despues. Es la firma de los casos de "se quedo sin responder"
  // encontrados en el inbox (ver ProcessInboundWhatsAppMessageUseCase).
  private async findConversationIdsWithoutReply(): Promise<string[]> {
    const rows = await this.prismaService.$queryRaw<Array<{ id: string }>>`
      SELECT c.id
      FROM alc_conversations c
      WHERE EXISTS (
        SELECT 1 FROM alc_messages m
        WHERE m.conversation_id = c.id
          AND m.direction = 'INBOUND'
          AND m.created_at = (
            SELECT MAX(m2.created_at) FROM alc_messages m2
            WHERE m2.conversation_id = c.id
          )
      )
    `;
    return rows.map((row) => row.id);
  }

  async findById(conversationId: string): Promise<ConversationDetail | null> {
    const record = await this.prismaService.conversation.findUnique({
      where: { id: conversationId },
      include: {
        contact: true,
        handoffs: { orderBy: { requestedAt: 'desc' }, take: 1 },
      },
    });

    if (!record) {
      return null;
    }

    const latestHandoff = record.handoffs[0] ?? null;

    return {
      id: record.id,
      status: record.status,
      locale: record.locale,
      waitingOnHuman: record.status === 'WAITING_HUMAN',
      assignedAdvisorId:
        latestHandoff && latestHandoff.status !== 'CLOSED'
          ? latestHandoff.assignedAgentId
          : null,
      contact: {
        id: record.contact.id,
        externalId: record.contact.externalId,
        name: record.contact.name,
        phoneNumber: record.contact.phoneNumber,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }

  async listMessages(
    conversationId: string,
    options: ListMessagesOptions,
  ): Promise<MessagesPage<MessageItem>> {
    const { before, limit } = options;
    const where: Prisma.MessageWhereInput = {
      conversationId,
      ...(before ? { createdAt: { lt: before } } : {}),
    };

    // Se pide un registro de mas (limit + 1) para saber si quedan mensajes
    // mas viejos sin una segunda consulta de COUNT(*) -- esa cuenta ademas
    // quedaria desactualizada si llega un mensaje nuevo mientras el admin
    // sigue viendo el hilo. Se trae desc (lo mas reciente primero) y se
    // revierte para devolver el bloque en orden cronologico ascendente.
    const records = await this.prismaService.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
    });

    const hasMore = records.length > limit;
    const page = records.slice(0, limit).reverse();

    return {
      data: page.map((record) => ({
        id: record.id,
        direction: record.direction,
        type: record.type,
        text: record.text,
        status: record.status,
        metadata: toMetadataRecord(record.metadata),
        createdAt: record.createdAt,
      })),
      hasMore,
    };
  }

  async getFlowState(conversationId: string): Promise<FlowStateItem | null> {
    const record = await this.prismaService.conversationFlowState.findUnique({
      where: { conversationId },
    });

    if (!record) {
      return null;
    }

    return {
      nodeId: record.nodeId,
      status: record.status,
      attempts: record.attempts,
      variables: redactSensitiveVariables(record.variables),
    };
  }
}
