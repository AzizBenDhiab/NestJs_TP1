import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
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
    const newCv = this.cvRepository.create({ ...createCvDto, user: user });
    return this.cvRepository.save(newCv);
  }
  

  async findAll() : Promise<CvEntity[]>{
    return await this.cvRepository.find();
  }

  async  findOne(id: number) : Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    return await cv;

  }

  async update(id: number, cv: UpdateCvDto, user: UserEntity ): Promise<CvEntity> {

    const newCv = await this.cvRepository.preload({
      id,
      ...cv
    });
    if(! newCv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
    return await this.cvRepository.save(newCv);

  }

  async remove(id: number) {
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