import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import { CreateAutoReplyUseCase } from '../application/use-cases/create-auto-reply.use-case';
import { ListAutoRepliesUseCase } from '../application/use-cases/list-auto-replies.use-case';
import { UpdateAutoReplyUseCase } from '../application/use-cases/update-auto-reply.use-case';
import { DeleteAutoReplyUseCase } from '../application/use-cases/delete-auto-reply.use-case';
import { CreateAutoReplyDto } from './dto/create-auto-reply.dto';
import { UpdateAutoReplyDto } from './dto/update-auto-reply.dto';
import { AutoReplyResponseDto } from './dto/auto-reply-response.dto';

@ApiTags('Auto Replies')
@Controller('auto-replies')
@UseGuards(CrmSecretGuard)
export class AutoRepliesController {
  constructor(
    private readonly createAutoReplyUseCase: CreateAutoReplyUseCase,
    private readonly listAutoRepliesUseCase: ListAutoRepliesUseCase,
    private readonly updateAutoReplyUseCase: UpdateAutoReplyUseCase,
    private readonly deleteAutoReplyUseCase: DeleteAutoReplyUseCase,
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

  @Patch(':id')
  @ApiOkResponse({
    type: AutoReplyResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAutoReplyDto,
  ): Promise<AutoReplyResponseDto> {
    const autoReply = await this.updateAutoReplyUseCase.execute(id, {
      title: body.title,
      matchType: body.matchType,
      patterns: body.patterns,
      responseText: body.responseText,
      responseImageUrl: body.responseImageUrl,
      priority: body.priority,
      isActive: body.isActive,
      locale: body.locale,
    });

    return AutoReplyResponseDto.fromDomain(autoReply);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteAutoReplyUseCase.execute(id);
  }
}
