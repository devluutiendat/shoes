import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { promises as fs } from 'fs';
import { saveFile } from 'config/multer.config';
import { console } from 'inspector';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(productId: number, type: string, file: Express.Multer.File) {
    productId = Number(productId);
    const filename = await saveFile(file);

    return this.prisma.image.create({
      data: {
        productId,
        type,
        link: `/uploads/${filename}`,
      },
    });
  }

  async createMany(
    createImageDto: CreateImageDto,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file must be uploaded!');
    }
    if (
      !createImageDto.productId ||
      !createImageDto.types ||
      createImageDto.types.length === 0
    ) {
      throw new BadRequestException('Missing productId or types');
    }
    if (createImageDto.types.length !== files.length) {
      throw new BadRequestException(
        'Number of types must match the number of uploaded files',
      );
    }
    const results = await Promise.allSettled(
      files.map(async (file, index) => {
        try {
          const filename = await saveFile(file);

          const image = await this.prisma.image.create({
            data: {
              productId: createImageDto.productId + 0,
              type: createImageDto.types[index].type,
              link: `/uploads/${filename}`,
            },
          });

          return { success: true, file: filename, data: image };
        } catch (error) {
          return {
            success: false,
            file: file.originalname,
            error: error.message,
          };
        }
      }),
    );

    const success = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value);
    const failed = results
      .filter((r) => r.status === 'rejected')
      .map((r) => r.reason);

    return {
      message: 'Batch upload completed',
      successCount: success.length,
      failedCount: failed.length,
      success,
      failed,
    };
  }

  async findAll() {
    return this.prisma.image.findMany();
  }

  async findByProductId(productId: number) {
    return this.prisma.image.findMany({ where: { productId } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    const product = await this.prisma.product.findUnique(
      { where: { id: updateImageDto.productId } },
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return this.prisma.image.update({
      where: { id },
      data: updateImageDto,
    });
  }

  async remove(id: number) {
    const image = await this.prisma.image.findUnique({ where: { id },select: { link: true } });
    if (!image) throw new NotFoundException('Image not found');

    // Đảm bảo đường dẫn chính xác
    const filePath = path.join(process.cwd(), image.link);
    console.log('[DEBUG] File Path:', filePath);

    try {
      await fs.access(filePath);
      console.log('[DEBUG] File exists, deleting now...');
      await fs.unlink(filePath);
      console.log('[DEBUG] File deleted successfully:', filePath);
    } catch (err) {
      console.warn(
        `[ERROR] Cannot delete file: ${filePath}. Error: ${err.message}`,
      );
    }

    return this.prisma.image.delete({ where: { id } });
  }
}
