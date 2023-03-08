import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
