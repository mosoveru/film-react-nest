import { Injectable, Inject } from '@nestjs/common';
import { FilmsRepository } from '../types';
import { FilmDto } from './dto/film.dto';
import { TOKENS } from '../constants';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(TOKENS.REPOSITORY) private readonly repository: FilmsRepository,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  save(film: Omit<FilmDto, 'id'>) {
    return this.repository.save(film);
  }
}
