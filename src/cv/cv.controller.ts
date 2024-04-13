import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from '.././user/entities/user.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}


  @Post()
  create(@Body() body: { createCvDto: CreateCvDto; user: UserEntity }) {
    const { createCvDto, user } = body;
    return this.cvService.create(createCvDto, user);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() body: { updateCvDto: UpdateCvDto; user: UserEntity }) {
    const { updateCvDto, user } = body;
     return this.cvService.update(+id,  updateCvDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
