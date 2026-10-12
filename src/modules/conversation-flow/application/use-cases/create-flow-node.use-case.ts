import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFlowNodeInput,
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
} from '../ports/flow-definition.repository';
import { FlowNode } from '../../domain/conversation-flow.types';
import { ApplicationError } from '@shared/domain/errors/application.error';

const FLOW_NODE_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

// Crea un nodo "borrador": solo id + texto + imagen, sin options/capture/
// terminal. El nodo queda guardado pero inalcanzable para el bot hasta que
// alguien de TI lo agregue a aupair-flow.definition.ts y lo conecte desde
// las options de otro nodo — crear aquí nunca altera el flujo en vivo.
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
        'Node id must be lowercase kebab-case (e.g. "new-message")',
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

    return this.flowDefinitionRepository.createNode(input);
  }
}
