import { Inject, Injectable } from '@nestjs/common';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
  UpdateAutoReplyInput,
} from '../ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';
import { ApplicationError } from '@shared/domain/errors/application.error';

@Injectable()
export class UpdateAutoReplyUseCase {
  constructor(
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
  ) {}

  async execute(id: string, input: UpdateAutoReplyInput): Promise<AutoReply> {
    const existing = await this.autoReplyRepository.findById(id);

    if (!existing) {
      throw new ApplicationError(
        'AUTO_REPLY_NOT_FOUND',
        'Auto reply not found',
        404,
      );
    }

    return this.autoReplyRepository.update(id, input);
  }
}
