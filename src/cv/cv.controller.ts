import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors,Query } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from '.././user/entities/user.entity';
import { CvEntity } from './entities/cv.entity'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from './interfaces/multer-file.interface';
import { SearchCvDto } from './dto/search-cv.dto';


@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}


  @Post()
  create(@Body() body: { createCvDto: CreateCvDto; user: UserEntity }) {
    const { createCvDto, user } = body;
    return this.cvService.create(createCvDto, user);
  }



  @Get('find')
  async findByCriteria(
    @Query() searchDTO: SearchCvDto,
  ) {
    
    return this.cvService.getCvsByCriteria(searchDTO);
  }
  
  @Get()
  findAll() {
    return this.cvService.findAll();
  }
  @Get('all')
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
      return this.cvService.getAll(page, limit);
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
  
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile, @Param('id') id: number): Promise<CvEntity> {
    return this.cvService.associateFileWithCv(id, file);
  }
}
