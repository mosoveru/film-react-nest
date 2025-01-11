import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { MemoryRepository } from './films.repository/films-memory.repository';
import { REPOSITORY_TOKEN } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    {
      provide: REPOSITORY_TOKEN,
      useFactory: (configService: AppConfig) => {
        const driver = configService.database.driver;
        console.log(driver);
        if (driver === 'memory') {
          return new MemoryRepository();
        }
      },
      inject: ['CONFIG'],
    },
  ],
})
export class AppModule {}
