import { Inject, Injectable } from '@nestjs/common';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
} from '../ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';

@Injectable()
export class ListAutoRepliesUseCase {
  constructor(
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
  ) {}

  async execute(): Promise<AutoReply[]> {
    return this.autoReplyRepository.listAll();
  }
}
