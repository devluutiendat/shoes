import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Cron } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductService {
  private readonly cacheKey = 'most_sold_products';

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const exitProduct = await this.prisma.product.findFirst({
      where: { name: createProductDto.name },
    });
    if (exitProduct) throw new ConflictException('Product already exists');
    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create product' + error.message);
    }
  }
  
  async getProductById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new BadRequestException('Failed to fetch product' + error.message);
    }
  }
  
  async getProducts(filterProductDto?: FilterProductDto) {
    const { name, items_per_page, page, sort_price } = filterProductDto;
    const take = Number(items_per_page) || 10;
    const current = Number(page) || 1;
    const skip = (current - 1) * take;

    try {
      const where: any = {};

      if (name) {
        where.name = { contains: name };
      }

      const total = await this.prisma.product.count({ where });

      const data = await this.prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          images: {
            where: { type: 'main' },
            select: { link: true },
          },
        },
        orderBy: sort_price ? { price: sort_price } : {price : "desc"},
      });

      return {
        data,
        meta: {
          total,
          current,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch/search products' + error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.getProductById(id);
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
        },
      });
      return product;
    } catch (error) {
      throw new BadRequestException('Failed to update product' + error.message);
    }
  }

  async remove(id: number) {
    await this.getProductById(id);
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete product' + error.message);
    }
  }

  async getMostSoldProducts() {
    const cachedData = await this.cacheManager.get(this.cacheKey);
    if (cachedData) {
      return cachedData;
    }
    return await this.refreshMostSoldProducts();
  }

  @Cron('0 0 * * *')
  async refreshMostSoldProducts() {
    try {
      const products = await this.prisma.product.findMany({
        include: { orders: true },
        orderBy: { orders: { _count: 'desc' } },
        take: 10,
      });

      await this.cacheManager.set(this.cacheKey, products, 600_000); // Cache for 10 minutes
      return products;
    } catch (error) {
      throw new Error('Failed to refresh most sold products cache' + error.message);
    }
  }
}
