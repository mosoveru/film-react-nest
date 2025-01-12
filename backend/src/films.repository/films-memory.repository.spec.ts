import { Test, TestingModule } from '@nestjs/testing';
import { FilmsMemoryRepository } from './films-memory.repository';

describe('FilmsRepository', () => {
  let provider: FilmsMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsMemoryRepository],
    }).compile();

    provider = module.get<FilmsMemoryRepository>(FilmsMemoryRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
