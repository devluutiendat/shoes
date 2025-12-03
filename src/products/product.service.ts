import {
  Injectable,
  NotFoundException,
<<<<<<< HEAD
  InternalServerErrorException,
  ConflictException,
  Inject,
=======
  ConflictException,
  Inject,
  BadRequestException,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
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
<<<<<<< HEAD
  ) { }
=======
  ) {}
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869

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
<<<<<<< HEAD
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
=======
      throw new BadRequestException('Failed to create product' + error.message);
    }
  }
  
  async getProductById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
<<<<<<< HEAD
      console.error('Error fetching product by ID:', error);
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  async getAllProductIds() {
    try {
      const products = await this.prisma.product.findMany({
        select: { id: true },
      });
      return products.map((product) => product.id);
    } catch (error) {
      console.error('Error fetching product IDs:', error);
      throw new InternalServerErrorException('Failed to fetch product IDs');
    }
  }

  async getProducts(filterProductDto?: FilterProductDto) {
    const { name, items_per_page, page, sort_price, styles } = filterProductDto;
=======
      throw new BadRequestException('Failed to fetch product' + error.message);
    }
  }
  
  async getProducts(filterProductDto?: FilterProductDto) {
    const { name, items_per_page, page, sort_price } = filterProductDto;
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    const take = Number(items_per_page) || 10;
    const current = Number(page) || 1;
    const skip = (current - 1) * take;

    try {
      const where: any = {};

      if (name) {
        where.name = { contains: name };
      }

<<<<<<< HEAD
      if (styles) {
        where.style = { in: styles };
      }

=======
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
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
<<<<<<< HEAD
          _count: {
            select: {
              orders: true
            }
          }
        },
        orderBy: sort_price ? { price: sort_price } : { price: "desc" },
=======
        },
        orderBy: sort_price ? { price: sort_price } : {price : "desc"},
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
      });

      return {
        data,
        meta: {
          total,
          current,
<<<<<<< HEAD
          totalPage: Math.ceil(total / take),
        },
      };
    } catch (error) {
      console.error('Error fetching/searching products:', error);
      throw new InternalServerErrorException('Failed to fetch/search products');
=======
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch/search products' + error.message);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
<<<<<<< HEAD
    await this.findById(id);
=======
    await this.getProductById(id);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
        },
      });
      return product;
    } catch (error) {
<<<<<<< HEAD
      console.error('Error updating product:', error);
      throw new InternalServerErrorException('Failed to update product');
=======
      throw new BadRequestException('Failed to update product' + error.message);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }

  async remove(id: number) {
<<<<<<< HEAD
    await this.findById(id);
=======
    await this.getProductById(id);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
<<<<<<< HEAD
      console.error('Error deleting product:', error);
      throw new InternalServerErrorException('Failed to delete product');
=======
      throw new BadRequestException('Failed to delete product' + error.message);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }

  async getMostSoldProducts() {
    const cachedData = await this.cacheManager.get(this.cacheKey);
    if (cachedData) {
<<<<<<< HEAD
      console.log('Returning cached data');
=======
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
      return cachedData;
    }
    return await this.refreshMostSoldProducts();
  }

  @Cron('0 0 * * *')
  async refreshMostSoldProducts() {
<<<<<<< HEAD
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
=======
    try {
      const products = await this.prisma.product.findMany({
        include: { orders: true },
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
        orderBy: { orders: { _count: 'desc' } },
        take: 10,
      });

      await this.cacheManager.set(this.cacheKey, products, 600_000); // Cache for 10 minutes
<<<<<<< HEAD
      console.log('Cache updated at midnight!');
      return products;
    } catch (error) {
      console.error('Error refreshing cache:', error);
      throw new Error('Failed to refresh most sold products cache');
=======
      return products;
    } catch (error) {
      throw new Error('Failed to refresh most sold products cache' + error.message);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }
}
