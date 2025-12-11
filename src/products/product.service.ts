import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  Inject,
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
  ) { }

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
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          images: true,
          _count: {
            select: {
              orders: true
            }
          }
        }
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  async getAllProduct() {
    try {
      const products = await this.prisma.product.findMany({
        include:{
          images:true,
            _count: {
            select: {
              orders: true
            }
        }}
      });
      return products;
    } catch (error) {
      console.error('Error fetching product IDs:', error);
      throw new InternalServerErrorException('Failed to fetch product IDs');
    }
  }

  async getProducts(filterProductDto?: FilterProductDto) {
    const { name, items_per_page, page, sort_price, styles } = filterProductDto;
    const take = Number(items_per_page) || 10;
    const current = Number(page) || 1;
    const skip = (current - 1) * take;

    try {
      const where: any = {};

      if (name) {
        where.name = { contains: name };
      }

      if (styles) {
        where.style = { in: styles };
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
          _count: {
            select: {
              orders: true
            }
          }
        },
        orderBy: sort_price ? { price: sort_price } : { price: "desc" },
      });

      return {
        data,
        meta: {
          total,
          current,
          totalPage: Math.ceil(total / take),
        },
      };
    } catch (error) {
      console.error('Error fetching/searching products:', error);
      throw new InternalServerErrorException('Failed to fetch/search products');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findById(id);
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
        },
      });
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async remove(id: number) {
    await this.findById(id);
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  async getMostSoldProducts() {
    const cachedData = await this.cacheManager.get(this.cacheKey);
    if (cachedData) {
      console.log('Returning cached data');
      return cachedData;
    }
    return await this.refreshMostSoldProducts();
  }

  @Cron('0 0 * * *')
  async refreshMostSoldProducts() {
    console.log('Refreshing most sold products cache...');
    try {
      const products = await this.prisma.product.findMany({
        include: {
          images: {
            where: { type: 'main' },
            select: { link: true },
          },
          _count: {
            select: {
              orders: true
            }
          }
        },
        orderBy: { orders: { _count: 'desc' } },
        take: 10,
      });

      await this.cacheManager.set(this.cacheKey, products, 600_000); // Cache for 10 minutes
      console.log('Cache updated at midnight!');
      return products;
    } catch (error) {
      console.error('Error refreshing cache:', error);
      throw new Error('Failed to refresh most sold products cache');
    }
  }
}
