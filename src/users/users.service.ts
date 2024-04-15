import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  async create(user: User): Promise<User> {
    try {
      const resp = await this.userRepository.create(user);
      console.log(resp, '<<<<resp');
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.findAll();
      console.log(users, '<<<<users');
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
