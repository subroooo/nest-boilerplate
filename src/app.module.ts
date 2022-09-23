import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './common/configs/env.config';
import { LoggerMiddleware } from './common/configs/middleware/logger.middleware';
import { winstonConfig } from './common/configs/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    WinstonModule.forRootAsync(winstonConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
