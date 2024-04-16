import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(dto.username);

    if (user?.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user._id,
      username: user.username,
      deleted: user.deleted,
    };

    const access_token = await this.jwtService.signAsync(payload);

    this.usersService.update(user._id.toString(), access_token, {
      latestLogin: new Date(),
    });

    return {
      access_token,
    };
  }
}
