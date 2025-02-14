import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const levelStr = `level=${level}\t`;
    const messageStr = `message=${message}\t`;
    const optionalParamsStr = optionalParams
      .map((param, index) => {
        return `optionalParam-${index + 1}=${param}\t`;
      })
      .join('')
      .concat('\n');

    return levelStr.concat(messageStr, optionalParamsStr);
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, optionalParams));
  }
}
