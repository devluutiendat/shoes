import {  Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewsController } from './review.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewService,PrismaService],
})
export class ReviewModule {}
