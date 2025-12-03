import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ProductOrder {
  @ApiProperty({
    description: 'The quantity of the product ordered.',
    example: 2,
=======
import {  IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The quantity of the product ordered.',
    type: Number,
    example: 2,
    minimum: 1,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The ID of the product being ordered.',
<<<<<<< HEAD
    example: 1,
=======
    type: Number,
    example: 1,
    minimum: 1,
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  })
  @IsInt()
  @Min(1)
  productId: number;
<<<<<<< HEAD
}

export class CreateOrderDto {

  @ApiProperty({
    type: [ProductOrder],
    description: 'List of products in the order',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  productOrders: ProductOrder[];
=======

  @ApiProperty({
    description: 'The ID of the user placing the order.',
    type: Number,
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
}
