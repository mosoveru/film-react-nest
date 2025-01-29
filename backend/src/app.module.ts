import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { RepositoryModule } from './repository/repository.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/schemas/films.entity';
import { Schedules } from './films/schemas/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const url = new URL(configService.get<string>('database.url'));
        return {
          type: 'postgres',
          host: url.hostname,
          port: Number(url.port),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: url.pathname.slice(1),
          entities: [Films, Schedules],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    RepositoryModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService],
})
export class AppModule {}
