import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('blog/:email');
  await app.listen(3003);
}

bootstrap();

// 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
