import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillService {
constructor( @InjectRepository(SkillEntity)
private  readonly skillRepository: Repository<SkillEntity>)
{}

  create(createSkillDto : CreateSkillDto) {
    const  newSkill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(newSkill)
  }

  findAll() {
    return `This action returns all skill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
