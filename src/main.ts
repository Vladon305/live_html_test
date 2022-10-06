import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = Number(process.env.PORT) | 4000;

  await app.listen(port, () => console.log(`started on port ${port}`));
}
bootstrap();
