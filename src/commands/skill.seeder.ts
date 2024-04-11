import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { UserService } from '../user/user.service';
import {  randEmail, randFilePath, randFullName, randJobTitle, randNumber, randPassword, randSentence, randUser, randUserName, randWord } from '@ngneat/falso';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSkillDto } from '../skill/dto/create-skill.dto';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);
  for (let i = 1; i < 10 ; i++) {
    const newSkill = new CreateSkillDto();
    newSkill.Designation = randWord();
    
    console.log('added',newSkill);
  
    await skillService.create(newSkill);
  }
  await app.close();
}
bootstrap();