import { FilmDto } from '../films/dto/film.dto';

export interface FilmsRepository {
  findAll(): FilmDto[] | Promise<FilmDto[]>;
  findByUUID(id: string): FilmDto | Promise<FilmDto>;
  findFilmWithScheduleByUUID(
    filmId: string,
    scheduleId: string,
  ): FilmDto | Promise<FilmDto>;
  updateOneSeat(data: {
    filmId: string;
    scheduleId: string;
    seat: string;
  }): Promise<any>;
  startTransaction(options?: any): Promise<any>;
  commitTransaction(session: any): Promise<void>;
  abortTransaction(session: any): Promise<void>;
}
