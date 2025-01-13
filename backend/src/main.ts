import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
