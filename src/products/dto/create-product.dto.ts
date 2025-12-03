import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Tên sản phẩm', example: 'T-shirt' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Phong cách sản phẩm', example: 'Casual' })
  @IsString()
  style: string;

  @ApiProperty({ description: 'Mô tả sản phẩm', example: 'A comfortable cotton t-shirt' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Giá sản phẩm', example: 299 })
  @IsInt()
  price: number;
}
