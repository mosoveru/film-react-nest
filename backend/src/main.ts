import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TskvLogger } from './logger/tskv.logger';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();

  switch (process.env.LOGGER) {
    case 'TSKV': {
      app.useLogger(new TskvLogger());
      break;
    }
    case 'JSON': {
      app.useLogger(new JsonLogger());
      break;
    }
    default: {
      app.useLogger(new DevLogger());
      break;
    }
  }

  await app.listen(3000);
}
bootstrap();
