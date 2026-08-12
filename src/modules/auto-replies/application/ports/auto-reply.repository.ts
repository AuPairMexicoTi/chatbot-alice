import { AutoReply } from '../../domain/auto-reply.entity';

export interface AutoReplyRepository {
  listActiveByLocale(locale: string): Promise<AutoReply[]>;
}

export const AUTO_REPLY_REPOSITORY = Symbol('AUTO_REPLY_REPOSITORY');
