import { HttpException, Logger, ArgumentsHost } from '@nestjs/common';
import { ErrorCode } from './error.code';

export class HttpErrorException extends HttpException {
  private readonly logger = new Logger(HttpErrorException.name);

  constructor(errorCode: ErrorCode, host?: ArgumentsHost) {
    super(errorCode.message, errorCode.status);
    this.logError(errorCode, host);
  }

  private logError(errorCode: ErrorCode, host?: ArgumentsHost): void {
    const errorStack = new Error().stack;

    if (host) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const user = request.user
        ? `User: ${JSON.stringify(request.user)}`
        : 'No user info';

      this.logger.error(`
                Status: ${errorCode.status}, 
                Message: ${errorCode.message}, 
                Method: ${request.method}, 
                Path: ${request.url}, 
                Body: ${JSON.stringify(request.body)}, 
                Params: ${JSON.stringify(request.params)}, 
                Query: ${JSON.stringify(request.query)}, 
                ${user}
                Stack Trace: ${errorStack}
            `);
    } else {
      // ArgumentsHost가 없을 때 기본 에러 정보만 기록
      this.logger.error(`
                Status: ${errorCode.status}, 
                Message: ${errorCode.message}, 
                Stack Trace: ${errorStack}
            `);
    }
  }
}
