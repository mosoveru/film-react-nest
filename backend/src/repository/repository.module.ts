import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Films } from '../films/schemas/films.entity';
import { TOKENS } from '../constants';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FilmsPostgresRepository } from '../films/repository/films-postgres.repository';
import { DataSource, Repository } from 'typeorm';
import { Schedules } from '../films/schemas/schedule.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Films, Schedules])],
  providers: [
    {
      provide: TOKENS.REPOSITORY,
      useFactory: (
        configService: ConfigService,
        filmsRepository: Repository<Films>,
        schedulesRepository: Repository<Schedules>,
        dataSource: DataSource,
      ) => {
        const driver = configService.get<string>('database.driver');

        if (driver === 'postgres') {
          return new FilmsPostgresRepository(
            filmsRepository,
            schedulesRepository,
            dataSource,
          );
        }
      },
      inject: [
        ConfigService,
        getRepositoryToken(Films),
        getRepositoryToken(Schedules),
        DataSource,
      ],
    },
  ],
  exports: [TOKENS.REPOSITORY],
})
export class RepositoryModule {}
