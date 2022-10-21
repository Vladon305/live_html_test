import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  const port = Number(process.env.PORT) | 4000;

  await app.listen(port, () => console.log(`started on port ${port}`));
}
bootstrap();
