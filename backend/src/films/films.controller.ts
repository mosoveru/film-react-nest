import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAvailableFilms() {
    const films = await this.filmsService.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async findActualSchedule(@Param('id') id: string) {
    const film = await this.filmsService.findByUUID(id);
    if (!film) {
      throw new NotFoundException('No film found.');
    }
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
