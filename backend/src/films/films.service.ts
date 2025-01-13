import { Injectable, Inject } from '@nestjs/common';
import { FilmsRepository } from '../types';
import { TOKENS } from '../constants';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(TOKENS.REPOSITORY) private readonly repository: FilmsRepository,
  ) {}

  findByUUID(id: string) {
    return this.repository.findByUUID(id);
  }

  findAll() {
    return this.repository.findAll();
  }
}
