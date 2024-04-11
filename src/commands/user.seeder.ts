import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import {  randEmail, randFilePath, randFullName, randJobTitle, randNumber, randPassword, randUser, randUserName, randWord } from '@ngneat/falso';
import { CreateUserDto } from '../user/dto/create-user.dto';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  for (let i = 1; i < 10 ; i++) {
    const newUser = new CreateUserDto();
    newUser.username = randUserName();
    newUser.email = randEmail();
    newUser.password = randPassword();
    
    console.log('added',newUser);
  
    await userService.create(newUser);
  }
  await app.close();
}
bootstrap();