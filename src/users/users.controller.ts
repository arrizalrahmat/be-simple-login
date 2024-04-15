import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Headers('access_token') token: string) {
    return this.usersService.findAll(token);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Headers('access_token') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, token, updateUserDto);
  }
}
