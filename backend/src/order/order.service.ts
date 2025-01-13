import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../types';
import { TOKENS } from '../constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { MongooseError } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { TicketDto } from './dto/ticket.dto';
import { FilmDto } from '../films/dto/film.dto';
import { ScheduleDto } from '../films/dto/schedule.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(TOKENS.REPOSITORY)
    private readonly repository: FilmsRepository,
  ) {}
  private ticket: TicketDto;
  private schedule: ScheduleDto;

  async makeOrder(orderData: CreateOrderDto) {
    const session = await this.repository.startTransaction();
    try {
      const ticketsWithUUID = await this.bookSeats(orderData.tickets);
      await this.repository.commitTransaction(session);
      return ticketsWithUUID;
    } catch (err: unknown) {
      await this.repository.abortTransaction(session);
      if (err instanceof MongooseError) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  private async bookSeats(tickets: TicketDto[]) {
    const ticketsWithUUID = [];
    for (const ticket of tickets) {
      const filmWithSchedule = await this.repository.findFilmWithScheduleByUUID(
        ticket.film,
        ticket.session,
      );
      this.checkFilmWithScheduleExisting(filmWithSchedule);
      this.ticket = ticket;
      this.schedule = filmWithSchedule.schedule[0];

      const seat = `${ticket.row}:${ticket.seat}`;

      this.checkOrderedSeatNumberAccuracy();
      this.checkSeatIsAvailable(seat);

      await this.writeSeatNumberToRepository(seat);
      ticketsWithUUID.push({ ...ticket, id: uuid() });
    }
    this.clearFields();
    return ticketsWithUUID;
  }

  private checkFilmWithScheduleExisting(filmWithSchedule: FilmDto) {
    if (!filmWithSchedule || !filmWithSchedule.schedule.length) {
      throw new Error('Фильм или сеанс не найден');
    }
  }

  private checkOrderedSeatNumberAccuracy() {
    if (
      !(this.ticket.row >= 1 && this.ticket.row <= this.schedule.rows) ||
      !(this.ticket.seat >= 1 && this.ticket.seat <= this.schedule.seats)
    ) {
      throw new Error('Неправильное посадочное место');
    }
  }

  private checkSeatIsAvailable(seat: string) {
    if (this.schedule.taken.includes(seat)) {
      throw new Error('Место уже занято');
    }
  }

  private async writeSeatNumberToRepository(seat: string) {
    return this.repository.updateOneSeat({
      filmId: this.ticket.film,
      scheduleId: this.ticket.session,
      seat: seat,
    });
  }

  private clearFields() {
    this.ticket = undefined;
    this.schedule = undefined;
  }
}
