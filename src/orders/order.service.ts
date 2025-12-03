import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
<<<<<<< HEAD
=======
  InternalServerErrorException,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { QueueService } from 'src/queues/queue.service';
import { UserService } from 'src/users/user.service';
<<<<<<< HEAD
=======
import { ProductService } from 'src/products/product.service';
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
<<<<<<< HEAD
    private queueService: QueueService,

  ) {}

  async create(createOrderDto: CreateOrderDto, userId : number) {
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
=======
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
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create order.');
    }
  }

  async findAll() {
<<<<<<< HEAD
    return await this.prisma.orders.findMany();
=======
    try {
      const orders = await this.prisma.orders.findMany();
      return orders;
    } catch (error) {
      this.logger.error(`Error fetching orders: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch orders.');
    }
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
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

<<<<<<< HEAD
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
=======
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      await this.getOrderById(id);

      return await this.prisma.orders.update({
        where: { id },
        data: updateOrderDto,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
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
<<<<<<< HEAD
    const order = await this.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    await this.prisma.orders.delete({ where: { id } });

    return { message: `Order #${id} has been deleted successfully.` };
=======
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
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  }
}
