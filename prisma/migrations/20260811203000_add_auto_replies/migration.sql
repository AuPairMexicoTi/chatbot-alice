CREATE TYPE "AutoReplyMatchType" AS ENUM ('EXACT', 'CONTAINS', 'REGEX');

CREATE TABLE "alc_auto_replies" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "match_type" "AutoReplyMatchType" NOT NULL,
    "patterns" JSONB NOT NULL,
    "response_text" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "locale" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_auto_replies_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "alc_auto_replies_key_key" ON "alc_auto_replies"("key");
CREATE INDEX "idx_alc_auto_replies_active_locale_priority" ON "alc_auto_replies"("is_active", "locale", "priority");
