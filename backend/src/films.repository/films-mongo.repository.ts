import { FilmsRepository } from '../types';
import { ClientSession, ClientSessionOptions, Model } from 'mongoose';
import { Film } from '../films/schemas/films.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(@InjectModel(Film.name) private readonly mongodb: Model<Film>) {}

  async findAll() {
    return this.mongodb.find({});
  }

  async findByUUID(id: string) {
    return this.mongodb.findOne({
      id,
    });
  }

  async findFilmWithScheduleByUUID(filmId: string, scheduleId: string) {
    return this.mongodb.findOne({
      id: filmId,
      schedule: {
        $elemMatch: {
          id: scheduleId,
        },
      },
    });
  }

  async updateOneSeat(data: {
    filmId: string;
    scheduleId: string;
    seat: string;
  }) {
    console.log('updateOneSeat');
    return this.mongodb.updateOne(
      {
        id: data.filmId,
        schedule: {
          $elemMatch: {
            id: data.scheduleId,
          },
        },
      },
      {
        $push: {
          'schedule.$.taken': data.seat,
        },
      },
      {
        new: true,
      },
    );
  }

  async startTransaction(options: ClientSessionOptions) {
    const session = await this.mongodb.startSession(options);
    session.startTransaction();
    return session;
  }

  async commitTransaction(session: ClientSession) {
    return session.commitTransaction();
  }

  async abortTransaction(session: ClientSession): Promise<void> {
    return session.abortTransaction();
  }
}
