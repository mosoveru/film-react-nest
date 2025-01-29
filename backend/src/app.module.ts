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
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('database.driver'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [Films, Schedules],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    RepositoryModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService],
})
export class AppModule {}
