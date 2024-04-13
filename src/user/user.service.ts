import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '@ngneat/falso';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor( 
  @InjectRepository(UserEntity)
  private userRepository:  Repository<UserEntity>,
  private jwtService : JwtService
  ){
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

async register(userData: CreateUserDto): Promise<Partial<UserEntity>> {
  console.log("helloooo")
  const user = this.userRepository.create({
    ...userData
  });
  console.log("hiiiiiiiiiiiii")
  user.salt = await bcrypt.genSalt();
  console.log("TTTTTTTTTTTTTT",user.salt)
  user.password = await bcrypt.hash(user.password, user.salt);
  try {
    await this.userRepository.save(user);
  } catch (e) {
    throw new ConflictException(`Le username et le email doivent être unique`);
  }
  return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }
}
