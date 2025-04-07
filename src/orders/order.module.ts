import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrdersController } from './order.controller';
import { PrismaService } from 'prisma/prisma.service';
import { QueueService } from 'src/queues/queue.service';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/users/user.service';
import { QueueModule } from 'src/queues/queue.module';
import { ProductService } from 'src/products/product.service';
@Module({
  imports : [forwardRef(() => QueueModule)],
  controllers: [OrdersController],
  providers: [OrderService,MailService,QueueService,PrismaService,UserService,ProductService],
  exports: [OrderService],
})
export class OrdersModule {}

