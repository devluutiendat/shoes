import {  Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService,PrismaService,],
  exports: [ImageService],
  
})
export class ImageModule {}
