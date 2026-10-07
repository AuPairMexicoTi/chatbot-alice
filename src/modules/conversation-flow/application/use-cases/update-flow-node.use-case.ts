import { Inject, Injectable } from '@nestjs/common';
import {
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
  UpdateFlowNodeInput,
} from '../ports/flow-definition.repository';
import { FlowNode } from '../../domain/conversation-flow.types';
import { ApplicationError } from '@shared/domain/errors/application.error';

@Injectable()
export class UpdateFlowNodeUseCase {
  constructor(
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository,
  ) {}

  async execute(id: string, patch: UpdateFlowNodeInput): Promise<FlowNode> {
    const definition = await this.flowDefinitionRepository.getDefinition();

    if (!definition.nodes[id]) {
      throw new ApplicationError(
        'FLOW_NODE_NOT_FOUND',
        'Flow node not found',
        404,
      );
    }

    return this.flowDefinitionRepository.updateNode(id, patch);
  }
}
