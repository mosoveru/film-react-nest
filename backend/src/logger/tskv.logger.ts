import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const levelStr = `level=${level}\t`;
    const messageStr = `message=${message}`;
    const optionalParamsStr = optionalParams
      .map((param, index) => {
        return `optionalParam-${index + 1}=${param}`;
      })
      .join('\t');

    return optionalParamsStr
      ? levelStr + messageStr + '\t' + optionalParamsStr + '\n'
      : levelStr + messageStr + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, ...optionalParams));
  }
}
