import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { AdminGuard } from 'src/auth/passport/admin.guard';
import { multerConfig } from 'config/multer.config';

@ApiTags('images')
@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        productId: { type: 'number', example: 1 },
        type: { type: 'string', example: 'thumbnail' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully!' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { productId: number; type: string },
  ) {
    if (!file) {
      throw new BadRequestException('File upload failed!');
    }
    if (!body.productId || !body.type) {
      throw new BadRequestException('Missing productId or type');
    }

    const image = await this.imageService.create(body.productId, body.type, file);
    
    return { message: 'File uploaded successfully!', data: image };
  }

  @Post('upload-multiple')
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        productId: { type: 'number', example: 1 },
        types: {
          type: 'array',
          items: { type: 'string', example: 'thumbnail' },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully!' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createImageDto: CreateImageDto,

  ) {
    const result = await this.imageService.createMany(createImageDto, files);    
    return result;
  }

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'Images retrieved successfully!' })
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an image by ID' })
  @ApiResponse({ status: 200, description: 'Image retrieved successfully!' })
  findByProductId(@Param('id') id: number) {
    return this.imageService.findByProductId(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an image' })
  @ApiResponse({ status: 200, description: 'Image updated successfully!' })
  update(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(id, updateImageDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an image' })
  @ApiResponse({ status: 204, description: 'Image deleted successfully!' })
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
