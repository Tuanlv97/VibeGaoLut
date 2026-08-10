import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('GreenPantry REST API Service')
    .setDescription(
      'RESTful API for GreenPantry Organic E-commerce, Content Commerce & Community Q&A Platform',
    )
    .setVersion('1.0.0')
    .addTag('Catalog', 'Product & Category APIs')
    .addTag('Commerce', 'Orders, Guest Checkout, Tracking & Verified Reviews')
    .addTag('Content', 'Nutrition Blog & Healthy Living Articles')
    .addTag('Community', 'Community Q&A & Advice')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`GreenPantry Backend running on http://localhost:${port}/api/v1`);
  console.log(`Swagger Docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
