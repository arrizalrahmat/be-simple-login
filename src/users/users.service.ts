import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { parseToken } from 'src/helpers/parse-jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  async create(dto: CreateUserDto): Promise<any> {
    const currentUser = await this.userRepository.findOne({
      username: dto.username,
    });

    if (currentUser) throw new BadRequestException('Username already used');
    const user = new User();
    user.username = dto.username;
    user.password = dto.password;
    user.deleted = dto.deleted ?? false; // Default to false if not provided
    user.latestLogin = new Date(); // Set the login time to the current time

    const resp = await this.userRepository.insert(user);
    return resp;
  }

  async findAll(token: string) {
    // Check if token is provided
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify token
      const parsedToken = parseToken(token);
      if (parsedToken.deleted) throw new UnauthorizedException();
    } catch (error) {
      // Handle token verification errors
      console.error('Token verification failed:', error);
      throw new UnauthorizedException();
    }

    const users = await this.userRepository.findAll();
    console.log(users, '<<<<users');
    return users;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new NotFoundException('Can not find user');
    return user;
  }

  async update(id: string, token: string, dto: UpdateUserDto) {
    // Check if token is provided
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify token
      const parsedToken = parseToken(token);
      if (parsedToken.deleted) throw new UnauthorizedException();
    } catch (error) {
      // Handle token verification errors
      console.error('Token verification failed:', error);
      throw new UnauthorizedException();
    }

    // Proceed with user update logic
    const objectId = new ObjectId(id);
    const user = await this.userRepository.findOne({ _id: objectId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.deleted = dto.deleted;
    return await this.userRepository.upsert(user);
  }
}
