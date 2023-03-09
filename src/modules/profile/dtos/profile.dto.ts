import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProfileDTO {
  @IsString()
  @IsNotEmpty()
  readonly profile_picture: string;

  @IsString()
  @IsNotEmpty()
  readonly cover: string;

  @IsEmail()
  @IsNotEmpty()
  readonly country: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly gender: boolean;
}

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}
