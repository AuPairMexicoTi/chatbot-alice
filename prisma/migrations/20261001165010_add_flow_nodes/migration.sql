-- CreateEnum
CREATE TYPE "FlowNodeTerminal" AS ENUM ('HANDOFF', 'CLOSED');

-- CreateEnum
CREATE TYPE "FlowNodeCapture" AS ENUM ('name', 'age', 'email', 'city', 'englishLevel');

-- CreateTable
CREATE TABLE "alc_flow_nodes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "options" JSONB,
    "capture" "FlowNodeCapture",
    "terminal" "FlowNodeTerminal",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alc_flow_nodes_pkey" PRIMARY KEY ("id")
);
