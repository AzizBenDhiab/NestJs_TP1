import { Module, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { UserModule } from '.././user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';




@Module({
  imports:[
    MulterModule.register({
      dest: './public/uploads',
      limits: {
        fileSize: 1024 * 1024, // taille max 1 mo
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb( new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST) , false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const randomName = uuidv4() + file.originalname;
          callback(null, randomName);
        },
      }),
    }),
   
    forwardRef(() =>UserModule),
    TypeOrmModule.forFeature([CvEntity])
  ],
  controllers: [CvController],
  providers: [CvService],
  exports:[CvService,TypeOrmModule]
})
export class CvModule {}
