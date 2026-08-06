import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context
      .switchToHttp()
      .getResponse<{ setHeader: (name: string, value: string) => void }>();
    const request = context.switchToHttp().getRequest<{ id?: string }>();

    return next.handle().pipe(
      tap(() => {
        if (request.id) {
          response.setHeader('x-request-id', request.id);
        }
      }),
    );
  }
}
