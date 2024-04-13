import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SkillEntity } from './../skill/entities/skill.entity';
import { SkillModule } from '../skill/skill.module';
import { CvModule } from '../cv/cv.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';



@Module({
 imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() =>  CvModule),
    forwardRef(() =>SkillModule),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
        secret: process.env.SECRET,
        signOptions: {
          expiresIn: 3600
        }
      })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
