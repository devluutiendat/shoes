import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [ProductsController],
  imports: [
    CacheModule.register({
      ttl: 600, // Default time-to-live (10 minutes)
      max: 100, // Maximum number of items in cache
    }),
  ],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductsModule {}
