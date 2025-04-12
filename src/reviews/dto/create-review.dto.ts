import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Order ID is required' })
  orderId: number;

  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Rating is required' })
  rating: number;

  @IsString()
  @Type(() => String)
  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;

  @IsInt()
  @Type(() => Number)   
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}
