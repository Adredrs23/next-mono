import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3005', // Replace with your React app URL or use '*' for any origin
    credentials: true, // Allows sending cookies with CORS requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  });

  await app.listen(process.env.NEST_PORT || 3000);
}
bootstrap();
