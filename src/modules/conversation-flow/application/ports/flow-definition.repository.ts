import { FlowDefinition, FlowNode } from '../../domain/conversation-flow.types';

export type UpdateFlowNodeInput = {
  content?: string;
  options?: Record<string, string> | null;
  capture?: FlowNode['capture'] | null;
  terminal?: FlowNode['terminal'] | null;
};

export type CreateFlowNodeInput = {
  id: string;
  content: string;
  options?: Record<string, string> | null;
  capture?: FlowNode['capture'] | null;
  terminal?: FlowNode['terminal'] | null;
};

export interface FlowDefinitionRepository {
  getDefinition(): Promise<FlowDefinition>;
  createNode(node: CreateFlowNodeInput): Promise<FlowNode>;
  updateNode(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode>;
  deleteNode(id: string): Promise<void>;
}

export const FLOW_DEFINITION_REPOSITORY = Symbol('FLOW_DEFINITION_REPOSITORY');
