import { FilmDto } from '../films/dto/film.dto';

export interface FilmsRepository {
  save(film: Omit<FilmDto, 'id'>): FilmDto;
  findAll(): FilmDto[];
}
