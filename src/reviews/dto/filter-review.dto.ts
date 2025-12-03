import { IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number = 10;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: number;
}
