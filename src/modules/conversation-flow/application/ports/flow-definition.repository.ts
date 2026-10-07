import { FlowDefinition, FlowNode } from '../../domain/conversation-flow.types';

// Solo el texto/imagen del nodo son editables desde el panel de
// administración — la estructura del flujo (options/capture/terminal, el
// wiring entre nodos) se define en código (aupair-flow.definition.ts) y se
// siembra vía Prisma.
export type UpdateFlowNodeInput = {
  content: string;
  imageUrl?: string | null;
};

// Permite crear nodos "borrador" (id + texto + imagen, sin options/capture/
// terminal) para que alguien pueda redactar contenido con anticipación. El
// nodo no es alcanzable por ninguna candidata hasta que TI lo agregue a
// aupair-flow.definition.ts y lo conecte desde las options de otro nodo.
export type CreateFlowNodeInput = {
  id: string;
  content: string;
  imageUrl?: string | null;
};

export interface FlowDefinitionRepository {
  getDefinition(): Promise<FlowDefinition>;
  createNode(node: CreateFlowNodeInput): Promise<FlowNode>;
  updateNode(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode>;
}

export const FLOW_DEFINITION_REPOSITORY = Symbol('FLOW_DEFINITION_REPOSITORY');
