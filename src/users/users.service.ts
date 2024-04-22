import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Hash } from 'src/auth/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (emailExists) {
      throw new BadRequestException('User with provided email already exists');
    }
    const user = this.userRepository.create({...createUserDto, password: await Hash.hash(createUserDto.password)});
    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = this.userRepository.findOneBy({id});
    if (!user) {
      throw new BadRequestException('User with provided id does not exist');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
