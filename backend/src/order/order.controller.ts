import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async makeOrder(@Body() orderInfo: CreateOrderDto) {
    const orderedTickets = await this.orderService.makeOrder(orderInfo);
    return {
      total: orderedTickets.length,
      items: orderedTickets,
    };
  }
}
