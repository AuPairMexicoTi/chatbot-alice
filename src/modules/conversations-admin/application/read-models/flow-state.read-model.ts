export interface FlowStateItem {
  nodeId: string;
  status: string;
  attempts: number;
  variables: Record<string, unknown>;
}
