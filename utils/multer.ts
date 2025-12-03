import * as multer from 'multer';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig: MulterOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          'Only .jpg, .png, .gif, and .webp files are allowed!',
        ),
        false,
      );
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 },
};

const UPLOAD_DIR = './uploads';

// Hàm lưu file vào thư mục `uploads/`
export async function saveFile(file: Express.Multer.File): Promise<string> {
  // Đảm bảo thư mục lưu trữ tồn tại
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  // Tạo tên file duy nhất
  const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFilename);

  // Lưu file vào thư mục
  await fs.writeFile(filePath, file.buffer);

  return uniqueFilename; // Trả về tên file đã lưu
}
