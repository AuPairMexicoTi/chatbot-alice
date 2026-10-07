import { Inject, Injectable } from '@nestjs/common';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
} from '../ports/auto-reply.repository';
import { ApplicationError } from '@shared/domain/errors/application.error';

@Injectable()
export class DeleteAutoReplyUseCase {
  constructor(
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.autoReplyRepository.findById(id);

    if (!existing) {
      throw new ApplicationError(
        'AUTO_REPLY_NOT_FOUND',
        'Auto reply not found',
        404,
      );
    }

    await this.autoReplyRepository.delete(id);
  }
}
