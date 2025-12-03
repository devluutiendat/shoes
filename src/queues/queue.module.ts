import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { MailService } from 'src/mail/mail.service';
<<<<<<< HEAD
import { UserService } from 'src/users/user.service';
import { PrismaService } from 'prisma/prisma.service';
=======
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
import { OrdersModule } from 'src/orders/order.module';
import { OrderService } from 'src/orders/order.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', 
    }),
    forwardRef(() => OrdersModule),
  ],
<<<<<<< HEAD
  providers: [QueueService,MailService,UserService,QueueProcessor,PrismaService,OrderService],
=======
  providers: [QueueService,MailService,QueueProcessor,OrderService],
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  exports: [QueueService,BullModule],
})
export class QueueModule {}
