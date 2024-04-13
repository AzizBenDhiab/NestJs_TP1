import { HttpException, HttpStatus,  Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { MulterFile } from './interfaces/multer-file.interface';
import { SearchCvDto } from './dto/search-cv.dto';


@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private  readonly cvRepository: Repository<CvEntity>,
    private readonly userService : UserService
  ){
  }

  async create(createCvDto: CreateCvDto , user: UserEntity) : Promise<CvEntity> {

    try{
      const newCv = this.cvRepository.create({ ...createCvDto, user: user });
      return await  this.cvRepository.save(newCv);
    }catch (e) {
      throw new HttpException('tous les champs firstname age cin job path sont obligatoirs', HttpStatus.BAD_REQUEST);
    }


  }
  async findRelatedCvs(user: UserEntity): Promise<CvEntity[]> {
    if(user.role === 'admin'){
      return await this.cvRepository.find();
    }
    return await this.cvRepository.find({ where: { user } });
  }
  
  async associateFileWithCv(cvId: number, file: MulterFile): Promise<CvEntity> {
  const cv = await this.cvRepository.findOne({ where: { id: cvId } });
  if (!cv) {
    throw new HttpException('cv not found', HttpStatus.BAD_REQUEST);
    }
   cv.path = file.path; 
   return this.cvRepository.save(cv);
  }



  async findAll() : Promise<CvEntity[]>{
    return await this.cvRepository.find();
  }

  async findOneById({ id, user }: { id: number, user: any }): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException(`Le CV d'ID ${id} n'existe pas`);
    }
    if (cv.user.id === user.id || user.role === 'admin') {
      return cv;
    } else {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à accéder à ce CV");
    }
  }

  async update(id: number, cvDto: UpdateCvDto, user: UserEntity ): Promise<CvEntity> {
    const existingCv = await this.cvRepository.findOne({ where: { id } });
  if (!existingCv) {
    throw new NotFoundException(`Le CV d'id ${id} n'existe pas`);
  }
  if(existingCv.user.id !== user.id && user.role !== 'admin') {
    throw new UnauthorizedException("Vous n'êtes pas autorisé à modifier ce CV");
  }
  if (cvDto.name ) {
    existingCv.name = cvDto.name;
  }

  if (cvDto.age ) {
    existingCv.age = cvDto.age;
  }
  if (cvDto.job ) {
    existingCv.job = cvDto.job;
  }
  if (cvDto.path ) {
    existingCv.path = cvDto.path;
  }


  const updatedCv = await this.cvRepository.save(existingCv);

  return updatedCv;
}
  async remove(id: number,user:UserEntity): Promise<any> {
    const existingCv = await this.cvRepository.findOne({ where: { id } });

    if (!existingCv) {
      throw new NotFoundException(`Le CV d'id ${id} n'existe pas`);
    }
    if(existingCv.user.id !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à supprimer ce CV");
    }
    return await this.cvRepository.delete(id);  }



async searchCvs(searchDto: SearchCvDto): Promise<CvEntity[]> {
  const { age, criteria } = searchDto;

  // Build query conditions based on provided search criteria
  const queryBuilder = this.cvRepository.createQueryBuilder('cv');
  if (age) {
      queryBuilder.orWhere('cv.age = :age', { age });
  }
  if (criteria) {
      queryBuilder.orWhere('cv.name LIKE :criteria', { criteria: `%${criteria}%` })
          .orWhere('cv.firstname LIKE :criteria', { criteria: `%${criteria}%` })
          .orWhere('cv.job LIKE :criteria', { criteria: `%${criteria}%` });
  }

  // Execute the query and return the result
  return queryBuilder.getMany();
}
}