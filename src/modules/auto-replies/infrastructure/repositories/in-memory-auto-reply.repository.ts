import { Injectable } from '@nestjs/common';
import { AutoReplyRepository } from '../../application/ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';

@Injectable()
export class InMemoryAutoReplyRepository implements AutoReplyRepository {
  readonly autoReplies: AutoReply[];

  constructor(autoReplies: AutoReply[] = []) {
    this.autoReplies = autoReplies;
  }

  async listActiveByLocale(locale: string): Promise<AutoReply[]> {
    return this.autoReplies
      .filter(
        (autoReply) =>
          autoReply.isActive &&
          (autoReply.locale === locale || autoReply.locale === null),
      )
      .sort((left, right) => right.priority - left.priority);
  }
}
