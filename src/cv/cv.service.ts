import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { MulterFile } from './interfaces/multer-file.interface';


@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private  readonly cvRepository: Repository<CvEntity>,
    private readonly userService : UserService
  ){
  }

  async create(createCvDto: CreateCvDto , user: UserEntity) : Promise<CvEntity> {
    const newCv = this.cvRepository.create({ ...createCvDto, user: user });
    return this.cvRepository.save(newCv);
  }
  
  async associateFileWithCv(cvId: number, file: MulterFile): Promise<CvEntity> {
  const cv = await this.cvRepository.findOne({ where: { id: cvId } });
  if (!cv) {
    throw new HttpException('cv not found', HttpStatus.BAD_REQUEST);
    }
   cv.path = file.path; 
   return this.cvRepository.save(cv);
  }

  findAll() {
    return `This action returns all cv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
