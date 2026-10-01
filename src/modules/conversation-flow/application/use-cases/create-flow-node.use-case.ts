import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFlowNodeInput,
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
} from '../ports/flow-definition.repository';
import { FlowNode } from '../../domain/conversation-flow.types';
import { ApplicationError } from '@shared/domain/errors/application.error';

const FLOW_NODE_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

@Injectable()
export class CreateFlowNodeUseCase {
  constructor(
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository,
  ) {}

  async execute(input: CreateFlowNodeInput): Promise<FlowNode> {
    if (!FLOW_NODE_ID_PATTERN.test(input.id)) {
      throw new ApplicationError(
        'FLOW_NODE_INVALID_ID',
        'Node id must be lowercase kebab-case (e.g. "new-country")',
        400,
      );
    }

    const definition = await this.flowDefinitionRepository.getDefinition();

    if (definition.nodes[input.id]) {
      throw new ApplicationError(
        'FLOW_NODE_ALREADY_EXISTS',
        `A node with id "${input.id}" already exists`,
        409,
      );
    }

    if (input.options) {
      const unknownTargets = Object.values(input.options).filter(
        (targetId) => !definition.nodes[targetId],
      );
      if (unknownTargets.length > 0) {
        throw new ApplicationError(
          'FLOW_NODE_UNKNOWN_TARGET',
          `Unknown target node id(s): ${unknownTargets.join(', ')}`,
          400,
        );
      }
    }

    return this.flowDefinitionRepository.createNode(input);
  }
}
