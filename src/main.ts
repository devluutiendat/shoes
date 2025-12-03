<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
=======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
<<<<<<< HEAD
=======
  app.use(cookieParser());
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .addTag('e-commerce')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
<<<<<<< HEAD
  app.useStaticAssets(join(__dirname, '../../uploads'), { prefix: '/uploads' });
  await app.listen(5000);
=======

  app.useStaticAssets(join(__dirname, '../../uploads'), { prefix: '/uploads' });

  await app.listen(process.env.PORT ?? 5000);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
}
bootstrap();
