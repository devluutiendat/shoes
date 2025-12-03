import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'The page number to return',
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @ApiProperty({
    example: 10,
    description: 'The number of items to return',
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @ApiProperty({
    example: 'John',
    description: 'Search by name or email',
    required: false,
  })
  @IsString()
  search?: string;
}
