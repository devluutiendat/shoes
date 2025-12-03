import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PriceSort {
  INCRE = 'asc',
  DCRE = 'desc',
}

export class FilterProductDto {
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  items_per_page: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    description: 'Product name to filter',
    example: 'Nike Shoes',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Product style to filter',
    example: 'women',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    value ? decodeURIComponent(value).split(',').map((v: string) => v.trim()) : []
  )
  styles?: string[]; 

  @ApiPropertyOptional({
    description: 'Sorting order of the price (asc or desc)',
    enum: PriceSort,
    example: PriceSort.INCRE,
  })
  @IsEnum(PriceSort)
  @IsOptional()
  sort_price?: PriceSort;
}
