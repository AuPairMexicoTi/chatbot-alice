import { randomUUID } from 'node:crypto';

export class RequestId {
  static create(): string {
    return randomUUID();
  }
}
