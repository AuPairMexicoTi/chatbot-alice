import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestId } from '../../domain/value-objects/request-id';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(
    request: Request & { id?: string },
    _: Response,
    next: NextFunction,
  ): void {
    request.id = request.header('x-request-id') ?? RequestId.create();
    next();
  }
}
