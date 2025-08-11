import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:4000',   
  credentials: true,            
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
