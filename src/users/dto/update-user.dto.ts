import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  deleted?: boolean = false;

  @IsDate()
  @IsOptional()
  latestLogin?: Date;
}
