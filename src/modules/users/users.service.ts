import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly manager: EntityManager) {}

  hashPassword(password: string) {
    const hashedPassword = hash(password, 10);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    createUserDto.password = hashedPassword;
    await this.manager.insert(User, createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneUser(userName: string) {
    return await this.manager.findOne(User, { where: { userName } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
