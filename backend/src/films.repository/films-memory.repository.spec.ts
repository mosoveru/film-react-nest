import { Test, TestingModule } from '@nestjs/testing';
import { MemoryRepository } from './films-memory.repository';

describe('FilmsRepository', () => {
  let provider: MemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryRepository],
    }).compile();

    provider = module.get<MemoryRepository>(MemoryRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
