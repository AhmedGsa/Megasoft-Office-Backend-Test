import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('Megasoft Office Backend Test API Documentation')
    .setDescription('Megasoft Office Backend test API Documentation')
    .setVersion('1.0')
    .addTag('Megasoft Office')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
