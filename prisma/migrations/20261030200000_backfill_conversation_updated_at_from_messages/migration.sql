-- La bandeja de conversaciones admin ordena por alc_conversations.updated_at
-- esperando que refleje el ultimo mensaje, pero ese campo historicamente solo
-- se tocaba al cambiar de status. Este backfill lo adelanta (nunca lo
-- retrasa) al timestamp del mensaje mas reciente de cada conversacion, para
-- que el orden sea correcto desde ya; de aqui en adelante
-- PrismaMessageRepository.create() lo mantiene al dia en cada mensaje nuevo.
UPDATE "alc_conversations" c
SET "updated_at" = sub.last_message_at
FROM (
    SELECT "conversation_id", MAX("created_at") AS last_message_at
    FROM "alc_messages"
    GROUP BY "conversation_id"
) sub
WHERE sub."conversation_id" = c."id"
  AND sub.last_message_at > c."updated_at";
