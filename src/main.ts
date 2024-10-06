import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as expressBasicAuth from 'express-basic-auth';

import { appConfiguration } from '@/utils/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverPort = configService.getOrThrow('SERVER_PORT');
  const apiCredentials = configService.getOrThrow('SERVER_PASSWORD');
  const nodeENV = configService.getOrThrow('NODE_ENV');

  const TITLE = 'Project - <Name>';
  const DESCRIPTION = 'The main API of "<Project>"';
  const API_VERSION = '1.0';

  if (nodeENV === 'production') {
    app.use(
      ['/docs', '/docs-json'],

      expressBasicAuth({
        challenge: true,
        users: { admin: apiCredentials },
      }),
    );
  }

  appConfiguration(app);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: TITLE,
  });

  await app.listen(serverPort);

  const url = await app.getUrl();
  logger.log(`listening app at ${url}`);
}

bootstrap();
