import {
  CreateFlowNodeInput,
  FlowDefinitionRepository,
  UpdateFlowNodeInput,
} from '../../application/ports/flow-definition.repository';
import { FlowDefinition, FlowNode } from '../../domain/conversation-flow.types';
import { aupairFlowDefinition } from '../../domain/aupair-flow.definition';

export class InMemoryFlowDefinitionRepository implements FlowDefinitionRepository {
  private nodes: Record<string, FlowNode>;

  constructor(definition: FlowDefinition = aupairFlowDefinition) {
    this.nodes = { ...definition.nodes };
  }

  async getDefinition(): Promise<FlowDefinition> {
    return {
      entryNodeId: aupairFlowDefinition.entryNodeId,
      maxAttempts: aupairFlowDefinition.maxAttempts,
      nodes: this.nodes,
    };
  }

  async createNode(node: CreateFlowNodeInput): Promise<FlowNode> {
    const created: FlowNode = {
      id: node.id,
      content: node.content,
      imageUrl: node.imageUrl ?? undefined,
    };
    this.nodes[node.id] = created;
    return created;
  }

  async updateNode(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode> {
    const existing = this.nodes[id];
    if (!existing) throw new Error(`FlowNode with id ${id} not found`);

    const updated: FlowNode = {
      ...existing,
      content: patch.content,
      ...(patch.imageUrl !== undefined && {
        imageUrl: patch.imageUrl ?? undefined,
      }),
    };
    this.nodes[id] = updated;
    return updated;
  }
}
