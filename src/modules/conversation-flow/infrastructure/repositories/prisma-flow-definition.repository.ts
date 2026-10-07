import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  CreateFlowNodeInput,
  FlowDefinitionRepository,
  UpdateFlowNodeInput,
} from '../../application/ports/flow-definition.repository';
import { FlowDefinition, FlowNode } from '../../domain/conversation-flow.types';
import { aupairFlowDefinition } from '../../domain/aupair-flow.definition';

export class PrismaFlowDefinitionRepository implements FlowDefinitionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDefinition(): Promise<FlowDefinition> {
    const records = await this.prisma.flowNode.findMany();

    // Tabla vacía (proyecto recién levantado sin sembrar) -> se usa el flujo
    // hardcodeado como respaldo, para que el bot nunca se quede sin menú.
    if (records.length === 0) return aupairFlowDefinition;

    const nodes: Record<string, FlowNode> = {};
    for (const record of records) {
      nodes[record.id] = {
        id: record.id,
        content: record.content,
        imageUrl: record.imageUrl ?? undefined,
        options: (record.options as Record<string, string> | null) ?? undefined,
        capture: record.capture ?? undefined,
        terminal: record.terminal ?? undefined,
      };
    }

    return {
      entryNodeId: aupairFlowDefinition.entryNodeId,
      maxAttempts: aupairFlowDefinition.maxAttempts,
      nodes,
    };
  }

  async createNode(node: CreateFlowNodeInput): Promise<FlowNode> {
    const record = await this.prisma.flowNode.create({
      data: {
        id: node.id,
        content: node.content,
        imageUrl: node.imageUrl ?? null,
      },
    });

    return {
      id: record.id,
      content: record.content,
      imageUrl: record.imageUrl ?? undefined,
      options: (record.options as Record<string, string> | null) ?? undefined,
      capture: record.capture ?? undefined,
      terminal: record.terminal ?? undefined,
    };
  }

  async updateNode(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode> {
    const record = await this.prisma.flowNode.update({
      where: { id },
      data: {
        content: patch.content,
        ...(patch.imageUrl !== undefined && { imageUrl: patch.imageUrl }),
      },
    });

    return {
      id: record.id,
      content: record.content,
      imageUrl: record.imageUrl ?? undefined,
      options: (record.options as Record<string, string> | null) ?? undefined,
      capture: record.capture ?? undefined,
      terminal: record.terminal ?? undefined,
    };
  }
}
