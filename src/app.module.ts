import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [UserModule, CvModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
