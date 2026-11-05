import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  ConversationPurgeCounts,
  DataRetentionRepository,
} from '../../application/ports/data-retention.repository';

// Unico proveedor que escribe en alc_webhook_events. Filtrar por el aprovecha
// el indice (provider, created_at).
const webhookProvider = 'WHATSAPP';

// updated_at y created_at son `timestamp` sin zona guardados en UTC. Se manda
// la fecha como texto ISO con cast para que la comparacion no dependa de la
// zona horaria de la sesion de Postgres.
const toUtcTimestamp = (date: Date): string => date.toISOString();

@Injectable()
export class PrismaDataRetentionRepository implements DataRetentionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async previewConversationPurge(
    inactiveBefore: Date,
  ): Promise<ConversationPurgeCounts> {
    const inactive = { updatedAt: { lt: inactiveBefore } };
    const [conversations, messages, contacts] = await Promise.all([
      this.prisma.conversation.count({ where: inactive }),
      this.prisma.message.count({ where: { conversation: inactive } }),
      this.prisma.contact.count({
        where: { conversations: { some: {}, every: inactive } },
      }),
    ]);

    return { conversations, messages, contacts };
  }

  countWebhookEventsCreatedBefore(createdBefore: Date): Promise<number> {
    return this.prisma.webhookEvent.count({
      where: { provider: webhookProvider, createdAt: { lt: createdBefore } },
    });
  }

  purgeConversationBatch(
    inactiveBefore: Date,
    batchSize: number,
  ): Promise<ConversationPurgeCounts> {
    return this.prisma.$transaction(async (tx) => {
      // SKIP LOCKED: PrismaMessageRepository.create actualiza la conversacion
      // antes de insertar, asi que una conversacion con un mensaje en curso
      // esta bloqueada y se omite en vez de borrarse a media escritura.
      const selected = await tx.$queryRaw<
        Array<{ id: string; contact_id: string }>
      >`
        SELECT id, contact_id
        FROM alc_conversations
        WHERE updated_at < ${toUtcTimestamp(inactiveBefore)}::timestamp
        ORDER BY updated_at
        LIMIT ${batchSize}
        FOR UPDATE SKIP LOCKED
      `;

      if (selected.length === 0) {
        return { conversations: 0, messages: 0, contacts: 0 };
      }

      const conversationIds = selected.map((row) => row.id);
      const contactIds = [...new Set(selected.map((row) => row.contact_id))];
      const byConversation = { conversationId: { in: conversationIds } };

      // Las FK son Restrict a proposito: nada se borra en cascada por
      // accidente, asi que los hijos van primero y de forma explicita. La
      // excepcion es flow_state, que la FK elimina junto con la conversacion.
      await tx.toolExecution.deleteMany({
        where: { aiRun: byConversation },
      });
      await tx.aiRun.deleteMany({ where: byConversation });
      await tx.handoff.deleteMany({ where: byConversation });
      const messages = await tx.message.deleteMany({ where: byConversation });
      const conversations = await tx.conversation.deleteMany({
        where: { id: { in: conversationIds } },
      });

      // Un contacto se conserva mientras tenga otra conversacion. El bloqueo
      // evita chocar con un lead que justo reaparece: se omite aqui y su
      // contacto se reutiliza.
      const contacts = await tx.$executeRaw`
        DELETE FROM alc_contacts
        WHERE id IN (
          SELECT c.id
          FROM alc_contacts c
          WHERE c.id = ANY(${contactIds}::text[])
            AND NOT EXISTS (
              SELECT 1 FROM alc_conversations v WHERE v.contact_id = c.id
            )
          FOR UPDATE SKIP LOCKED
        )
      `;

      return {
        conversations: conversations.count,
        messages: messages.count,
        contacts,
      };
    });
  }

  purgeWebhookEventBatch(
    createdBefore: Date,
    batchSize: number,
  ): Promise<number> {
    return this.prisma.$executeRaw`
      DELETE FROM alc_webhook_events
      WHERE id IN (
        SELECT id
        FROM alc_webhook_events
        WHERE provider = ${webhookProvider}
          AND created_at < ${toUtcTimestamp(createdBefore)}::timestamp
        ORDER BY created_at
        LIMIT ${batchSize}
        FOR UPDATE SKIP LOCKED
      )
    `;
  }
}
