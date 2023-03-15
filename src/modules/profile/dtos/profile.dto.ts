import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProfileDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

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
  readonly gender: boolean;
}

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}
