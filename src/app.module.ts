import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './images/image.module';
import { OrdersModule } from './orders/order.module';
import { ProductsModule } from './products/product.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queues/queue.module';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './users/user.module';
import { ReviewModule } from './reviews/review.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UserModule,
    ImageModule,
    OrdersModule,
    ProductsModule,
    QueueModule,
    MailModule,
    ReviewModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
