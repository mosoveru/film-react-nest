import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmDto } from './dto/film.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAvailableFilms() {
    const films = this.filmsService.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  findActualSchedule(@Param('id') id: string) {}

  @Post()
  create(@Body() film: Omit<FilmDto, 'id'>) {
    return this.filmsService.save(film);
  }
}
