import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { TOKENS } from '../constants';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: TOKENS.REPOSITORY,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
