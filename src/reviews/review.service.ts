import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewDto } from './dto/filter-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getReviews(reviewDto: ReviewDto) {
    const { limit, page, productId } = reviewDto;
    const skip = page > 1 ? (page - 1) * limit : 0;
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalReviews = await this.prisma.review.count({
      where: { productId },
    });

    return {
      data: reviews,
      total: totalReviews,
      page,
      limit,
      totalPages: Math.ceil(totalReviews / limit),
    };
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const { orderId, rating, comment, userId } = createReviewDto;

    const order = await this.prisma.orders.findFirst({
      where: { id: orderId, userId },
      include: { review: true },
    });
    const product = await this.prisma.product.findUnique({where : {id: order.productId}});
    if (!product) throw new NotFoundException('Product not found');

    if (!order) throw new ConflictException('Order not found');
    if (order.review) throw new ConflictException('You have already reviewed this product');

    try {
      const review = await this.prisma.review.create({
        data: {
          rating,
          comment,
          userId,
          productId: order.productId,
          orderId,
        },
      });
      return review;
    } catch (error) {
      throw new InternalServerErrorException('Could not save review, please try again later');
    }
  }

  async updateReview(id: number, data: UpdateReviewDto) {
    await this.getReviewById(id);
    try {
      return await this.prisma.review.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(`Failed to update review: ${error.message}`);
    }
  }

  async deleteReview(id: number) {
    await this.getReviewById(id);
    try {
      return await this.prisma.review.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to delete review: ${error.message}`);
    }
  }

  async getReviewById(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }
}
