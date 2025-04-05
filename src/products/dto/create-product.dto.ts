import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
  @IsInt()
  price: number;
}
