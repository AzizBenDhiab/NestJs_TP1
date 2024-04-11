import { Module, forwardRef } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { UserEntity } from '.././user/entities/user.entity';
import { SkillEntity } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([SkillEntity]),
    forwardRef(() =>UserModule)
  ],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
