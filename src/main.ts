import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const winstonLogger = app.get(WINSTON_MODULE_PROVIDER);
  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get('SERVER_PORT');
  await app.listen(SERVER_PORT);

  Logger.log(`Start Run: ${SERVER_PORT}`);
}
bootstrap();
