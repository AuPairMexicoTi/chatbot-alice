import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import {
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
} from '../application/ports/flow-definition.repository';
import { CreateFlowNodeUseCase } from '../application/use-cases/create-flow-node.use-case';
import { UpdateFlowNodeUseCase } from '../application/use-cases/update-flow-node.use-case';
import { FlowDefinition, FlowNode } from '../domain/conversation-flow.types';
import { CreateFlowNodeDto } from './dto/create-flow-node.dto';
import { UpdateFlowNodeDto } from './dto/update-flow-node.dto';

// Expone lectura del flujo, creación de nodos "borrador" (id + texto +
// imagen, sin wiring) y edición del texto/imagen de un nodo existente. La
// estructura (options/capture/terminal, qué nodo conecta con cuál) es
// código (aupair-flow.definition.ts) — no hay forma de cambiar el wiring
// desde el panel de administración.
@ApiTags('Conversation Flow')
@Controller('conversation-flow')
@UseGuards(CrmSecretGuard)
export class ConversationFlowController {
  constructor(
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository,
    private readonly createFlowNodeUseCase: CreateFlowNodeUseCase,
    private readonly updateFlowNodeUseCase: UpdateFlowNodeUseCase,
  ) {}

  @Get('definition')
  @ApiOkResponse({
    description:
      'Snapshot of the active conversation flow definition (editable nodes).',
  })
  getDefinition(): Promise<FlowDefinition> {
    return this.flowDefinitionRepository.getDefinition();
  }

  @Post('nodes')
  @ApiOkResponse({
    description:
      'Creates a draft flow node (id + content + image only, not wired into the flow).',
  })
  createNode(@Body() body: CreateFlowNodeDto): Promise<FlowNode> {
    return this.createFlowNodeUseCase.execute(body);
  }

  @Patch('nodes/:id')
  @ApiOkResponse({ description: "Updates an existing flow node's text/image." })
  updateNode(
    @Param('id') id: string,
    @Body() body: UpdateFlowNodeDto,
  ): Promise<FlowNode> {
    return this.updateFlowNodeUseCase.execute(id, body);
  }
}
