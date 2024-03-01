import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      //Esto para transformar la data a como la pedimos en dto pero se vuelve mas dificil usar las validaciones !tener cuidado como la usamos
      transform:true,
      transformOptions:{
        enableImplicitConversion : true
      }
    })
  );

  await app.listen(process.env.PORT);
  console.log(`App running in port ${process.env.PORT}`);
  
}
bootstrap();
