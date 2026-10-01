import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { DeleteFlowNodeUseCase } from '../application/use-cases/delete-flow-node.use-case';
import { UpdateFlowNodeUseCase } from '../application/use-cases/update-flow-node.use-case';
import { FlowDefinition, FlowNode } from '../domain/conversation-flow.types';
import { CreateFlowNodeDto } from './dto/create-flow-node.dto';
import { UpdateFlowNodeDto } from './dto/update-flow-node.dto';

@ApiTags('Conversation Flow')
@Controller('conversation-flow')
@UseGuards(CrmSecretGuard)
export class ConversationFlowController {
  constructor(
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository,
    private readonly createFlowNodeUseCase: CreateFlowNodeUseCase,
    private readonly updateFlowNodeUseCase: UpdateFlowNodeUseCase,
    private readonly deleteFlowNodeUseCase: DeleteFlowNodeUseCase,
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
  @ApiOkResponse({ description: 'Creates a new flow node.' })
  createNode(@Body() body: CreateFlowNodeDto): Promise<FlowNode> {
    return this.createFlowNodeUseCase.execute(body);
  }

  @Patch('nodes/:id')
  @ApiOkResponse({ description: 'Updates an existing flow node.' })
  updateNode(
    @Param('id') id: string,
    @Body() body: UpdateFlowNodeDto,
  ): Promise<FlowNode> {
    return this.updateFlowNodeUseCase.execute(id, body);
  }

  @Delete('nodes/:id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Deletes a flow node.' })
  deleteNode(@Param('id') id: string): Promise<void> {
    return this.deleteFlowNodeUseCase.execute(id);
  }
}
