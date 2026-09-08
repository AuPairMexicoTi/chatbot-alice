CREATE TABLE "alc_conversation_flow_states" (
  "id" TEXT NOT NULL,
  "conversation_id" TEXT NOT NULL,
  "node_id" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "variables" JSONB NOT NULL DEFAULT '{}',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "alc_conversation_flow_states_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "alc_conversation_flow_states_conversation_id_key" ON "alc_conversation_flow_states"("conversation_id");
ALTER TABLE "alc_conversation_flow_states" ADD CONSTRAINT "alc_conversation_flow_states_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "alc_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
