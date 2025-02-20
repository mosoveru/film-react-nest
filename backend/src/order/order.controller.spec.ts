import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { TicketDto } from './dto/ticket.dto';

describe('Тестирование OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const ticketsMock = [
    {
      film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
      daytime: '2023-05-29T10:30:00.001Z',
      time: '2023-05-29T10:30:00.001Z',
      day: '2023-05-29T10:30:00.001Z',
      row: 2,
      seat: 5,
      price: 350,
    },
    {
      film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
      daytime: '2023-05-29T10:30:00.001Z',
      time: '2023-05-29T10:30:00.001Z',
      day: '2023-05-29T10:30:00.001Z',
      row: 2,
      seat: 5,
      price: 350,
    },
  ] satisfies TicketDto[];

  const createOrderDtoMock = {
    email: 'test@test.com',
    phone: '+79999999999',
    tickets: ticketsMock,
  } satisfies CreateOrderDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        makeOrder: jest.fn(() => ticketsMock),
      })
      .compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('Метод .makeOrder() контроллера должен вызвать метод сервиса.', () => {
    orderController.makeOrder(createOrderDtoMock);

    expect(orderService.makeOrder).toHaveBeenCalledWith(createOrderDtoMock);
  });

  it('Метод .makeOrder() контроллера должен вернуть корректное значение', async () => {
    const receivedValue = await orderController.makeOrder(createOrderDtoMock);

    expect(receivedValue).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        items: expect.any(Array),
      }),
    );
  });
});
