import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// swagger api
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

// pipes
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // config swagger options
  const options = new DocumentBuilder()
    .setTitle('Auth Example')
    .setDescription('JSWT Authentication demo with MongoDB')
    .setVersion('1.0')
    .addTag('users')
    .build()

  const document = SwaggerModule.createDocument(app, options);
  // setup swagger module
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
