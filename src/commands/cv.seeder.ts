import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import {  randCreditCardNumber, randFilePath, randFirstName, randFullName, randJobTitle, randLastName, randNumber, randUser, randWord } from '@ngneat/falso';
import { CreateCvDto } from '../cv/dto/create-cv.dto';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);
  const users = await userService.findAll();
  for (let i = 1; i < 10 ; i++) {
    const newCv = new CreateCvDto();
    newCv.name = randLastName();
    newCv.firstname = randFirstName();
    newCv.job = randJobTitle();
    newCv.age = randNumber({min:18, max:60});
    newCv.cin = parseInt(randCreditCardNumber());
    newCv.path = randFilePath();
    console.log('added',newCv);
    const user = users[Math.floor(Math.random() * users.length)];
    await cvService.create(newCv, user);
  }
  await app.close();
}
bootstrap();