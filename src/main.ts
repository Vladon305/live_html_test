import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: [
      'Access-Control-Allow-Methods',
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Тестовое задание для компании LiveHTML by Vladon305')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Vladon305')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const port = Number(process.env.PORT) | 4000;

  await app.listen(port, () => console.log(`started on port ${port}`));
}
bootstrap();
