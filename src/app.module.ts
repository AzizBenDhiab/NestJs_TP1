import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'
import { CvEntity } from './cv/entities/cv.entity';

dotenv.config();

@Module({
  imports: [UserModule, CvModule, SkillModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: '1234',
      database: process.env.DB_NAME,
      entities: [CvEntity],
      synchronize: true,
    }),
             ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
