import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration de la validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Pisciculture')
    .setDescription('API pour la gestion d\'une ferme piscicole')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Entrez le token JWT',
      in: 'header',
    }, 'access-token')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuration CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
