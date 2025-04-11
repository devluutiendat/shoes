import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './create-image.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @ApiPropertyOptional({ example: 1, description: 'ID of the product' })
  @Type(() => Number)
  productId: number;

  @ApiPropertyOptional({ example: 'thumbnail', description: 'Type of the image' })
  type: string;
}
