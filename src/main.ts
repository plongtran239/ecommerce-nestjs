import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const PORT = 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );

    await app
        .listen(PORT)
        .then(() => console.log(`Server is running on port ${PORT}`));
}

bootstrap();
