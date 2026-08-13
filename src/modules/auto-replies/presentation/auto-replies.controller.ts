import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAutoReplyUseCase } from '../application/use-cases/create-auto-reply.use-case';
import { ListAutoRepliesUseCase } from '../application/use-cases/list-auto-replies.use-case';
import { CreateAutoReplyDto } from './dto/create-auto-reply.dto';
import { AutoReplyResponseDto } from './dto/auto-reply-response.dto';

@ApiTags('Auto Replies')
@Controller('auto-replies')
export class AutoRepliesController {
  constructor(
    private readonly createAutoReplyUseCase: CreateAutoReplyUseCase,
    private readonly listAutoRepliesUseCase: ListAutoRepliesUseCase,
  ) {}

  @Get()
  @ApiOkResponse({
    type: AutoReplyResponseDto,
    isArray: true,
  })
  async list(): Promise<AutoReplyResponseDto[]> {
    const autoReplies = await this.listAutoRepliesUseCase.execute();

    return autoReplies.map(AutoReplyResponseDto.fromDomain);
  }

  @Post()
  @ApiCreatedResponse({
    type: AutoReplyResponseDto,
  })
  async create(
    @Body() body: CreateAutoReplyDto,
  ): Promise<AutoReplyResponseDto> {
    const autoReply = await this.createAutoReplyUseCase.execute({
      key: body.key,
      title: body.title,
      matchType: body.matchType,
      patterns: body.patterns,
      responseText: body.responseText,
      responseImageUrl: body.responseImageUrl ?? null,
      priority: body.priority ?? 0,
      isActive: body.isActive ?? true,
      locale: body.locale ?? 'es-MX',
    });

    return AutoReplyResponseDto.fromDomain(autoReply);
  }
}
