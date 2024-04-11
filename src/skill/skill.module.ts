import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { UserEntity } from '.././user/entities/user.entity';
import { SkillEntity } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([SkillEntity]),
  ],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
