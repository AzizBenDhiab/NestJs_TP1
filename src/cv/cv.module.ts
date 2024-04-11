import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { UserModule } from '.././user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([CvEntity]),
    UserModule
  ],
  controllers: [CvController],
  providers: [CvService],
  exports:[CvService,TypeOrmModule]
})
export class CvModule {}
