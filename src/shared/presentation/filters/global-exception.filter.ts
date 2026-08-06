import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationError } from '../../domain/errors/application.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { id?: string }>();

    const applicationError =
      exception instanceof ApplicationError ? exception : undefined;
    const httpException =
      exception instanceof HttpException ? exception : undefined;

    const statusCode =
      applicationError?.statusCode ??
      httpException?.getStatus() ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = {
      statusCode,
      code: applicationError?.code ?? this.getCode(statusCode),
      message:
        applicationError?.message ??
        this.getMessage(httpException, statusCode) ??
        'The request is invalid',
      details: applicationError?.details ?? [],
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      requestId: request.id ?? 'unknown',
    };

    response.status(statusCode).json(payload);
  }

  private getCode(statusCode: number): string {
    if (statusCode === 400) {
      return 'VALIDATION_ERROR';
    }

    if (statusCode === 403) {
      return 'FORBIDDEN';
    }

    return 'INTERNAL_ERROR';
  }

  private getMessage(
    exception: HttpException | undefined,
    statusCode: number,
  ): string | undefined {
    if (statusCode === 500) {
      return 'An unexpected error occurred';
    }

    const response = exception?.getResponse();
    if (typeof response === 'string') {
      return response;
    }

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response &&
      typeof response.message === 'string'
    ) {
      return response.message;
    }

    return undefined;
  }
}
