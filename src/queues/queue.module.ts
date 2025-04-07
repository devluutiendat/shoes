import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';
import { MailService } from 'src/mail/mail.service';
import { OrdersModule } from 'src/orders/order.module';
import { OrderService } from 'src/orders/order.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', 
    }),
    forwardRef(() => OrdersModule),
  ],
  providers: [QueueService,MailService,QueueProcessor,OrderService],
  exports: [QueueService,BullModule],
})
export class QueueModule {}
