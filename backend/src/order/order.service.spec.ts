import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { TOKENS } from '../constants';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: TOKENS.REPOSITORY,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
