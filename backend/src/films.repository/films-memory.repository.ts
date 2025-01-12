import { ConflictException, Injectable } from '@nestjs/common';
import { FilmDto } from '../films/dto/film.dto';
import { v4 as uuid } from 'uuid';
import { FilmsRepository } from '../types';

@Injectable()
export class FilmsMemoryRepository implements FilmsRepository {
  films: FilmDto[] = [];

  save(film: Omit<FilmDto, 'id'>) {
    if (this.films.find((f) => f.title === film.title)) {
      throw new ConflictException('Фильм уже существует');
    }

    const filmWithId = { ...film, id: uuid() };

    this.films.push(filmWithId);
    return filmWithId;
  }

  findAll() {
    return this.films;
  }
}
