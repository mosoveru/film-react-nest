import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../films/schemas/films.schema';
import { TOKENS } from '../constants';
import { Model } from 'mongoose';
import { FilmsMongoRepository } from '../films.repository/films-mongo.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [
    {
      provide: TOKENS.REPOSITORY,
      useFactory: (configService: ConfigService, filmsModel: Model<Film>) => {
        const driver = configService.get<string>('database.driver');

        if (driver === 'mongodb') {
          return new FilmsMongoRepository(filmsModel);
        }
      },
      inject: [ConfigService, getModelToken(Film.name)],
    },
  ],
  exports: [TOKENS.REPOSITORY],
})
export class RepositoryModule {}
