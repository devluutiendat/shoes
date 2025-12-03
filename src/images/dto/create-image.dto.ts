import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ImageDto {
  @IsString()
  @ApiProperty({ example: 'thumbnail', description: 'Type of the image' })
  type: string;
}

export class CreateImageDto {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 1, description: 'ID of the product' })
  productId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  @ApiProperty({
    type: [ImageDto],
    description: 'Array of image types',
    example: [{ type: 'thumbnail' }, { type: 'gallery' }, { type: 'banner' }],
  })
  types: ImageDto[];
}
