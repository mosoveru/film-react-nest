import { FilmsRepository } from '../../types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from '../schemas/films.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { FilmDto } from '../dto/film.dto';
import { ScheduleDto } from '../dto/schedule.dto';
import { Schedules } from '../schemas/schedule.entity';

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Films) private readonly postgres: Repository<Films>,
    @InjectRepository(Schedules)
    private readonly postgresSchedule: Repository<Schedules>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll() {
    console.log(this.postgres);
    const films = await this.postgres.find({
      where: {},
      relations: {
        schedules: true,
      },
    });

    return this.convertToDto(films);
  }

  async findByUUID(id: string) {
    const film = await this.postgres.findOne({
      where: {
        id,
      },
      relations: {
        schedules: true,
      },
    });
    return this.convertToDto([film]).pop();
  }

  async findFilmWithScheduleByUUID(filmId: string, scheduleId: string) {
    const film = await this.postgres.findOne({
      where: {
        id: filmId,
        schedules: {
          id: scheduleId,
        },
      },
      relations: {
        schedules: true,
      },
    });
    return this.convertToDto([film]).pop();
  }

  async updateOneSeat(data: {
    filmId: string;
    scheduleId: string;
    seat: string;
  }) {
    const schedule = await this.postgresSchedule.findOne({
      where: {
        id: data.scheduleId,
      },
    });
    schedule.taken =
      schedule.taken !== '' ? schedule.taken.concat(',', data.seat) : data.seat;
    await this.postgresSchedule.save(schedule);
  }

  async startTransaction() {
    const queryBuilder = this.dataSource.createQueryRunner();
    await queryBuilder.connect();
    await queryBuilder.startTransaction();
    return queryBuilder;
  }

  async commitTransaction(session: QueryRunner) {
    await session.commitTransaction();
  }

  async abortTransaction(session: QueryRunner) {
    await session.rollbackTransaction();
  }

  private convertToDto(films: Films[]): FilmDto[] {
    return films.map((film) => {
      return {
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: [film.tags],
        title: film.title,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
        schedule: film.schedules.map((schedule) => {
          return {
            id: schedule.id,
            daytime: schedule.daytime,
            hall: schedule.hall,
            rows: schedule.rows,
            seats: schedule.seats,
            price: schedule.price,
            taken: !schedule.taken.length ? [] : schedule.taken.split(','),
          } satisfies ScheduleDto;
        }),
      } satisfies FilmDto;
    });
  }
}
