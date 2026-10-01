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
      options: node.options ?? undefined,
      capture: node.capture ?? undefined,
      terminal: node.terminal ?? undefined,
    };
    this.nodes[node.id] = created;
    return created;
  }

  async deleteNode(id: string): Promise<void> {
    delete this.nodes[id];
  }

  async updateNode(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode> {
    const existing = this.nodes[id];
    if (!existing) throw new Error(`FlowNode with id ${id} not found`);

    const updated: FlowNode = {
      ...existing,
      ...(patch.content !== undefined && { content: patch.content }),
      ...(patch.options !== undefined && {
        options: patch.options ?? undefined,
      }),
      ...(patch.capture !== undefined && {
        capture: patch.capture ?? undefined,
      }),
      ...(patch.terminal !== undefined && {
        terminal: patch.terminal ?? undefined,
      }),
    };
    this.nodes[id] = updated;
    return updated;
  }
}
