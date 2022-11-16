import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('blog/:email');
    await app.listen(3000);
}

bootstrap();

// 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
