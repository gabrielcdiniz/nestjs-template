import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') || 3000;
  await app.listen(port, '0.0.0.0');

  Logger.log(`Listen on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
