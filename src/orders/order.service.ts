import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { QueueService } from 'src/queues/queue.service';
import { UserService } from 'src/users/user.service';
import { ProductService } from 'src/products/product.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private queueService: QueueService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, productId } = createOrderDto;
    // Check if user and product exist
    const user = await this.userService.getUserById(userId);
    await this.productService.getProductById(productId);

    try {
      const order = await this.prisma.orders.create({
        data: {
          ...createOrderDto,
          active: false,
        },
      });

      await this.queueService.sendVerificationEmail(
        user.email,
        order.userId.toString(),
        order.id,
      );

      return order;
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create order.');
    }
  }

  async findAll() {
    try {
      const orders = await this.prisma.orders.findMany();
      return orders;
    } catch (error) {
      this.logger.error(`Error fetching orders: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch orders.');
    }
  }

  async getOrderById(id: number) {
    const order = await this.prisma.orders.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      await this.getOrderById(id);

      return await this.prisma.orders.update({
        where: { id },
        data: updateOrderDto,
      });
    } catch (error) {
      this.logger.error(
        `Error updating order ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to update order.');
    }
  }

  async remove(id: number) {
    await this.getOrderById(id);

    try {
      await this.prisma.orders.delete({ where: { id } });
      return { message: `Order #${id} has been deleted successfully.` };
    } catch (error) {
      this.logger.error(
        `Error deleting order ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to delete order.');
    }
  }
}
