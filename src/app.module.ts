import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { ImageModule } from './images/image.module';
=======
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
import { OrdersModule } from './orders/order.module';
import { ProductsModule } from './products/product.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queues/queue.module';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './users/user.module';
<<<<<<< HEAD
=======
import { ImageModule } from './images/image.module';
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
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
<<<<<<< HEAD
    AuthModule,
    UserModule,
    ImageModule,
=======
    ImageModule,
    ReviewModule,
    AuthModule,
    UserModule,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    OrdersModule,
    ProductsModule,
    QueueModule,
    MailModule,
<<<<<<< HEAD
    ReviewModule,
=======
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
