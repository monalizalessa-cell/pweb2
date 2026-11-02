import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir que o Vite (porta 5173) envie/receba cookies
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // IMPORTANTE: permite o envio de cookies
  });

  // Prefixo global: todas as rotas começam com /api (ex.: /api/tarefas).
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('API NestJS To-Do em http://localhost:3000/api/tarefas');
}
bootstrap();