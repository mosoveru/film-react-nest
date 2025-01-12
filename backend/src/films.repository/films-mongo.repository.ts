import { FilmsRepository } from '../types';
import { Model } from 'mongoose';
import { Film } from '../films/schemas/films.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { FilmDto } from '../films/dto/film.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(@InjectModel(Film.name) private readonly mongodb: Model<Film>) {}

  async save(film: Omit<FilmDto, 'id'>) {
    const filmWithSameTitle = await this.mongodb.findOne({ title: film.title });
    if (filmWithSameTitle) {
      throw new ConflictException();
    }
    return this.mongodb.create({
      ...film,
      id: uuid(),
    });
  }

  async findAll() {
    return this.mongodb.find({});
  }
}
