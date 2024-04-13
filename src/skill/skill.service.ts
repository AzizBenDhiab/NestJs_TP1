import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException} from '@nestjs/common';


@Injectable()
export class SkillService {
constructor( @InjectRepository(SkillEntity)
private  readonly skillRepository: Repository<SkillEntity>)
{}

  create(createSkillDto : CreateSkillDto) {
    const  newSkill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(newSkill)
  }

  async findAll(): Promise<SkillEntity[]> {
    return this.skillRepository.find();
  }

  async findOne(id: number): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    return skill;
  }


   async update(id: number,skill: UpdateSkillDto ): Promise<SkillEntity> {

    const newskill = await this.skillRepository.preload({
      id,
      ...skill
    });
    if(! newskill) {
      throw new NotFoundException(`Le skill d'id ${id} n'existe pas`);
    }
    return await this.skillRepository.save(newskill);

  }

  async remove(id: number) {
    return await this.skillRepository.delete(id);  }
}