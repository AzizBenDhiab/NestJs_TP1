import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '@ngneat/falso';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '../enums/user-role.enum';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {
  }

  async findUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<UserEntity[]> {

    return await this.userRepository.find();

  }

  async create(newUserData: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({
      ...newUserData
    });
    user.salt = await bcrypt.genSalt();
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

  async login(credentials: { username: string, password: string }) {
    const { username, password } = credentials;
    let user = await this.findUserByUsername(username);
    if (!user) {
      user = await this.userRepository.findOne({ where: { email: username } });
      if(!user){
        return { message: 'User not found' };
      }

    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('username ou password erronée');
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { secret:process.env.SECRET });

    return {
      access_token: token
    };
  }



}


