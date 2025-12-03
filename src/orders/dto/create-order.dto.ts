import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ProductOrder {
  @ApiProperty({
    description: 'The quantity of the product ordered.',
    example: 2,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The ID of the product being ordered.',
    example: 1,
  })
  @IsInt()
  @Min(1)
  productId: number;
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
}
