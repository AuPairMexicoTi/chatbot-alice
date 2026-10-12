import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  CreateFlowNodeInput,
  FlowDefinitionRepository,
  UpdateFlowNodeInput,
} from '../../application/ports/flow-definition.repository';
import { FlowDefinition, FlowNode } from '../../domain/conversation-flow.types';
import { aupairFlowDefinition } from '../../domain/aupair-flow.definition';

const flowNodeImageFilenames: Record<string, string> = {
  menu: 'principal.jpeg',
  germany: 'alemania.jpeg',
  belgium: 'belgica.jpeg',
  usa: 'estados-unidos.jpeg',
  france: 'francia.jpeg',
  italy: 'italia.jpeg',
};

export class PrismaFlowDefinitionRepository implements FlowDefinitionRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly publicBaseUrl: string,
  ) {}

  async getDefinition(): Promise<FlowDefinition> {
    const records = await this.prisma.flowNode.findMany();

    // Los nodos canónicos siempre son el respaldo. Esto permite que un
    // despliegue nuevo funcione antes de que APM haya guardado una edición.
    const nodes: Record<string, FlowNode> = Object.fromEntries(
      Object.values(aupairFlowDefinition.nodes).map((node) => [
        node.id,
        {
          ...node,
          imageUrl: this.getDefaultImageUrl(node.id),
        },
      ]),
    );

    // Una fila creada desde APM tiene prioridad sobre el respaldo. En
    // particular, imageUrl=null significa que el administrador decidió quitar
    // la imagen, por lo que no se sustituye con una imagen predeterminada.
    for (const record of records) {
      const fallbackNode = nodes[record.id];
      nodes[record.id] = {
        id: record.id,
        content: record.content,
        imageUrl: record.imageUrl ?? undefined,
        options:
          (record.options as Record<string, string> | null) ??
          fallbackNode?.options,
        capture: record.capture ?? fallbackNode?.capture,
        terminal: record.terminal ?? fallbackNode?.terminal,
      };
    }

    return {
      entryNodeId: aupairFlowDefinition.entryNodeId,
      maxAttempts: aupairFlowDefinition.maxAttempts,
      nodes,
    };
  }

  private getDefaultImageUrl(nodeId: string): string | undefined {
    const filename = flowNodeImageFilenames[nodeId];
    return filename && this.publicBaseUrl
      ? `${this.publicBaseUrl}/api/v1/assets/${filename}`
      : undefined;
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
