import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomExceptionValidationFactory } from './common/factory/custom-exception-validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: CustomExceptionValidationFactory,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS Starter Kit')
    .setDescription("This's made for NestJS project initiation.")
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3030);
}
bootstrap();
