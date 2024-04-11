import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '@ngneat/falso';

@Injectable()
export class UserService {
  constructor( 
  @InjectRepository(UserEntity)
  private userRepository:  Repository<UserEntity>){
  }

  async findUserByUsername(username : string) : Promise< UserEntity>
  {
      return  await this.userRepository.findOne({ where: { username } });
  }
  
  async findAll(): Promise<UserEntity[]> {
    
      return await this.userRepository.find();
   
  }

  create(createUserDto: CreateUserDto) {
    const  newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser)
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
