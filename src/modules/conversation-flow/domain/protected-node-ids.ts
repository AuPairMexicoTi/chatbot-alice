import { aupairFlowDefinition } from './aupair-flow.definition';

/**
 * Ids the engine (`conversation-flow.engine.ts`) reaches for directly via
 * string literals (menu/inicio, asesor/humano, salir/cancelar shortcuts),
 * outside of any node's own `options` map. Deleting one of these would crash
 * the live bot the next time a user hits that shortcut, so node
 * creation/deletion never touches them.
 */
export const PROTECTED_FLOW_NODE_IDS: readonly string[] = [
  aupairFlowDefinition.entryNodeId,
  'handoff',
  'closed',
];
