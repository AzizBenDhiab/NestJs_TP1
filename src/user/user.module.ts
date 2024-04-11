import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SkillEntity } from './../skill/entities/skill.entity';
import { SkillModule } from '../skill/skill.module';
import { CvModule } from '../cv/cv.module';

@Module({
 imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() =>  CvModule),
    forwardRef(() =>SkillModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
