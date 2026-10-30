import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import { ListConversationsUseCase } from '../application/use-cases/list-conversations.use-case';
import { GetConversationUseCase } from '../application/use-cases/get-conversation.use-case';
import { ListConversationMessagesUseCase } from '../application/use-cases/list-conversation-messages.use-case';
import { GetConversationFlowStateUseCase } from '../application/use-cases/get-conversation-flow-state.use-case';
import { ListConversationsQueryDto } from './dto/list-conversations-query.dto';
import { ListMessagesQueryDto } from './dto/list-messages-query.dto';
import { ConversationListItemDto } from './dto/conversation-list-item.dto';
import { ConversationDetailDto } from './dto/conversation-detail.dto';
import { MessageItemDto } from './dto/message-item.dto';
import { FlowStateDto } from './dto/flow-state.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

// Endpoints internos de solo lectura, consumidos unicamente por el backend
// de APM (Checkout-Backend-APM) -- nunca por un frontend directamente. La
// restriccion de quien en APM puede llamarlos (admin/admin TI/marketing)
// vive del lado de APM; aqui solo se valida el secreto compartido.
@ApiTags('Conversations (admin, internal)')
@Controller('conversations')
@UseGuards(CrmSecretGuard)
export class ConversationsAdminController {
  constructor(
    private readonly listConversationsUseCase: ListConversationsUseCase,
    private readonly getConversationUseCase: GetConversationUseCase,
    private readonly listConversationMessagesUseCase: ListConversationMessagesUseCase,
    private readonly getConversationFlowStateUseCase: GetConversationFlowStateUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: ConversationListItemDto, isArray: true })
  async list(
    @Query() query: ListConversationsQueryDto,
  ): Promise<PaginatedResponseDto<ConversationListItemDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const result = await this.listConversationsUseCase.execute({
      search: query.search,
      status: query.status,
      dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
      dateTo: query.dateTo ? new Date(query.dateTo) : undefined,
      assignedAdvisorId: query.assignedAdvisorId,
      page,
      limit,
    });

    return PaginatedResponseDto.of(
      result.data.map((item) => ConversationListItemDto.fromReadModel(item)),
      page,
      limit,
      result.total,
    );
  }

  @Get(':conversationId')
  @ApiOkResponse({ type: ConversationDetailDto })
  async show(
    @Param('conversationId') conversationId: string,
  ): Promise<ConversationDetailDto> {
    const conversation =
      await this.getConversationUseCase.execute(conversationId);

    return ConversationDetailDto.fromReadModel(conversation);
  }

  @Get(':conversationId/messages')
  @ApiOkResponse({ type: MessageItemDto, isArray: true })
  async messages(
    @Param('conversationId') conversationId: string,
    @Query() query: ListMessagesQueryDto,
  ): Promise<PaginatedResponseDto<MessageItemDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;

    const result = await this.listConversationMessagesUseCase.execute(
      conversationId,
      page,
      limit,
    );

    return PaginatedResponseDto.of(
      result.data.map((item) => MessageItemDto.fromReadModel(item)),
      page,
      limit,
      result.total,
    );
  }

  @Get(':conversationId/flow-state')
  @ApiOkResponse({ type: FlowStateDto })
  async flowState(
    @Param('conversationId') conversationId: string,
  ): Promise<FlowStateDto | null> {
    const flowState =
      await this.getConversationFlowStateUseCase.execute(conversationId);

    return flowState ? FlowStateDto.fromReadModel(flowState) : null;
  }
}
