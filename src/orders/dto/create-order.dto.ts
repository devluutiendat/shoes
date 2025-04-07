import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The quantity of the product ordered.',
    type: Number,
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The ID of the product being ordered.',
    type: Number,
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  productId: number;

  @ApiProperty({
    description: 'The ID of the user placing the order.',
    type: Number,
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;
}
