import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean = false;
}
