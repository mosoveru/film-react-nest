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
        type: 'postgres',
        host: configService.get<string>('database.url'),
        port: 5432,
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: 'films_nest',
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
