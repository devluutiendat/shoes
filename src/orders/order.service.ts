import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { QueueService } from 'src/queues/queue.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private queueService: QueueService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const { productOrders } = createOrderDto;

    // Validate userId and productOrders exist
    if (!userId || !productOrders || productOrders.length === 0) {
      throw new BadRequestException('userId and productOrders are required');
    }

    // Verify user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Extract product IDs from productOrders
    const productIds = productOrders.map((item) => item.productId);

    // Fetch all products
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    // Validate all products exist
    if (products.length !== productIds.length) {
      throw new NotFoundException(
        `Some products not found. Expected ${productIds.length}, found ${products.length}`,
      );
    }

    // Build order data
    const orderData = productOrders.map((item) => ({
      userId,
      productId: item.productId,
      quantity: item.quantity,
      active: false,
    }));

    try {
      const createdOrders = await Promise.all(
        orderData.map((data) => this.prisma.orders.create({ data })),
      );

      await this.queueService.sendVerificationEmail(
        user.email,
        userId.toString(),
        createdOrders.map((order) => order.id),
        user.name,
      );

      return createdOrders;
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create order.');
    }
  }

  async findAll() {
    return await this.prisma.orders.findMany({
      include:{
        product:true
      }
    });
  }

  async getOrdersByUser(userId: number) {
    if (!userId) {
      throw new BadRequestException('userId are required');
    }

    const orders = await this.prisma.orders.findMany({
      where: {
        userId,
      },
      include:{
        product:true,
      }
    });

    return orders;
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

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
    try {
      const existingOrder = await this.getOrderById(id);
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found.`);
      }

      return await this.prisma.orders.update({
        where: { id },
        data: {
          ...updateOrderDto,
          userId: userId,
        },
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
    const order = await this.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    await this.prisma.orders.delete({ where: { id } });

    return { message: `Order #${id} has been deleted successfully.` };
  }
}
