import { ApiProperty } from '@nestjs/swagger';
import { FlowStateItem } from '../../application/read-models/flow-state.read-model';

export class FlowStateDto {
  @ApiProperty() nodeId!: string;
  @ApiProperty() status!: string;
  @ApiProperty() attempts!: number;
  @ApiProperty({
    type: Object,
    description: 'Variables del flujo, sin las sensibles (ej. email)',
  })
  variables!: Record<string, unknown>;

  static fromReadModel(flowState: FlowStateItem): FlowStateDto {
    return {
      nodeId: flowState.nodeId,
      status: flowState.status,
      attempts: flowState.attempts,
      variables: flowState.variables,
    };
  }
}
