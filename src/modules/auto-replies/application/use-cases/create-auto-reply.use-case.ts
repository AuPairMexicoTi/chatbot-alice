import { Inject, Injectable } from '@nestjs/common';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
  CreateAutoReplyInput,
} from '../ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';
import { ApplicationError } from '@shared/domain/errors/application.error';

@Injectable()
export class CreateAutoReplyUseCase {
  constructor(
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
  ) {}

  async execute(input: CreateAutoReplyInput): Promise<AutoReply> {
    const autoReplies = await this.autoReplyRepository.listAll();
    const duplicate = autoReplies.find((autoReply) => autoReply.key === input.key);

    if (duplicate) {
      throw new ApplicationError(
        'AUTO_REPLY_KEY_ALREADY_EXISTS',
        'Auto reply key already exists',
        409,
      );
    }

    return this.autoReplyRepository.create(input);
  }
}
