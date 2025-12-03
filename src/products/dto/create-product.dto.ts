import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
<<<<<<< HEAD
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
=======
  @ApiProperty({ description: 'Name product', example: 'Red Heels' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'style product', example: 'heel' })
  @IsString()
  style: string;

  @ApiProperty({ description: 'description   product', example: 'A comfortable cotton heel' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'price product', example: 299 })
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  @IsInt()
  price: number;
}
