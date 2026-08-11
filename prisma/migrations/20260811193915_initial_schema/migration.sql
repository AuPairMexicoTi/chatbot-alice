-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('OPEN', 'WAITING_HUMAN', 'CLOSED');

-- CreateEnum
CREATE TYPE "MessageDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'UNKNOWN', 'SYSTEM');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('RECEIVED', 'QUEUED', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "WebhookStatus" AS ENUM ('RECEIVED', 'QUEUED', 'PROCESSING', 'PROCESSED', 'FAILED', 'IGNORED');

-- CreateEnum
CREATE TYPE "HandoffStatus" AS ENUM ('OPEN', 'ACCEPTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "AiRunStatus" AS ENUM ('STARTED', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ToolExecutionStatus" AS ENUM ('STARTED', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "alc_contacts" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "name" TEXT,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_conversations" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "status" "ConversationStatus" NOT NULL DEFAULT 'OPEN',
    "locale" TEXT NOT NULL DEFAULT 'es-MX',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "direction" "MessageDirection" NOT NULL,
    "type" "MessageType" NOT NULL,
    "provider_message_id" TEXT,
    "text" TEXT,
    "status" "MessageStatus" NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_webhook_events" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "status" "WebhookStatus" NOT NULL,
    "payload" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_ai_runs" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "provider_response_id" TEXT,
    "status" "AiRunStatus" NOT NULL,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "total_tokens" INTEGER,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "alc_ai_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_tool_executions" (
    "id" TEXT NOT NULL,
    "ai_run_id" TEXT NOT NULL,
    "tool_name" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB,
    "status" "ToolExecutionStatus" NOT NULL,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "alc_tool_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alc_handoffs" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "status" "HandoffStatus" NOT NULL,
    "reason" TEXT,
    "assigned_agent_id" TEXT,
    "requested_at" TIMESTAMP(3) NOT NULL,
    "accepted_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_handoffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alc_contacts_external_id_key" ON "alc_contacts"("external_id");

-- CreateIndex
CREATE INDEX "idx_alc_contacts_phone_number" ON "alc_contacts"("phone_number");

-- CreateIndex
CREATE INDEX "idx_alc_conversations_contact_status" ON "alc_conversations"("contact_id", "status");

-- CreateIndex
CREATE INDEX "idx_alc_messages_conversation_created_at" ON "alc_messages"("conversation_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_alc_messages_provider_message_id" ON "alc_messages"("provider_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "alc_webhook_events_external_id_key" ON "alc_webhook_events"("external_id");

-- CreateIndex
CREATE INDEX "idx_alc_webhook_events_provider_created_at" ON "alc_webhook_events"("provider", "created_at");

-- CreateIndex
CREATE INDEX "idx_alc_ai_runs_conversation_created_at" ON "alc_ai_runs"("conversation_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_alc_tool_executions_ai_run_created_at" ON "alc_tool_executions"("ai_run_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_alc_handoffs_conversation_status" ON "alc_handoffs"("conversation_id", "status");

-- AddForeignKey
ALTER TABLE "alc_conversations" ADD CONSTRAINT "alc_conversations_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "alc_contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alc_messages" ADD CONSTRAINT "alc_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "alc_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alc_ai_runs" ADD CONSTRAINT "alc_ai_runs_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "alc_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alc_tool_executions" ADD CONSTRAINT "alc_tool_executions_ai_run_id_fkey" FOREIGN KEY ("ai_run_id") REFERENCES "alc_ai_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alc_handoffs" ADD CONSTRAINT "alc_handoffs_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "alc_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
