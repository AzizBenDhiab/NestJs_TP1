import { HttpException, HttpStatus,  Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
  
  getAll(page: number = 1, limit: number = 10): Promise<CvEntity[]> {
    const skip = (page - 1) * limit;
    return this.cvRepository.find({
      skip: skip,
      take: limit,
    });
  }
 


  async findOneById({ id, user }: { id: number, user: any }): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException(`Le CV d'ID ${id} n'existe pas`);
    }
    if ( this.isOwnerOrAdmin(cv, user)) {
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
  if(this.isOwnerOrAdmin(existingCv, user) === false) {
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
    if(this.isOwnerOrAdmin(existingCv, user) === false) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à supprimer ce CV");
    }
    return await this.cvRepository.delete(id);  }


    async getCvsByCriteria(searchDTO: SearchCvDto): Promise<CvEntity[]> {
      if (searchDTO.age || searchDTO.criteria) {
        return await this.cvRepository.find({
          where: [
            { firstname: Like(`%${searchDTO.criteria}%`) },
            { name: Like(`%${searchDTO.criteria}%`) },
            { job: Like(`%${searchDTO.criteria}%`) },
            { age: searchDTO.age },
          ]
        });
      } else {
        return await this.cvRepository.find();
      }
    }

    isOwnerOrAdmin(cv:CvEntity, user: UserEntity): boolean {

    return cv.user.id === user.id || user.role === 'admin';
   }
}