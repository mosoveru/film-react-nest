import { Controller, Get, Param } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  findAvailableFilms() {}

  @Get(':id/schedule')
  findActualSchedule(@Param('id') id: string) {}
}
