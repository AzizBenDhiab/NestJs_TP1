import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards, UnauthorizedException, Request, ParseIntPipe,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from '.././user/entities/user.entity';
import { CvEntity } from './entities/cv.entity'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from './interfaces/multer-file.interface';
import { JwtAuthGuard } from '../user/Guard/jwt-auth.guard';
import { AdminGuard } from '../user/Guard/admin.guard';
import { User } from '../user/decorator/user.decorator';


@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body:  CreateCvDto, @User() user: UserEntity) {
    return this.cvService.create(body, user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll(@Request() req: any) {

      return this.cvService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(   @Param('id', ParseIntPipe) id, @User() user) {
    return this.cvService.findOneById({ id: +id, user: user });
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string,@User() user,@Body() body:UpdateCvDto){

     return this.cvService.update(+id,  body,user);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number,@User() user) {
    return this.cvService.remove(+id,user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile, @Param('id') id: number): Promise<CvEntity> {
    return this.cvService.associateFileWithCv(id, file);
  }
}
