-- La purga de retencion busca conversaciones inactivas por updated_at (la
-- ultima actividad, ver PrismaMessageRepository.create). La bandeja admin
-- tambien ordena por este campo, asi que el indice ayuda a ambas consultas.
CREATE INDEX "idx_alc_conversations_updated_at" ON "alc_conversations"("updated_at");
