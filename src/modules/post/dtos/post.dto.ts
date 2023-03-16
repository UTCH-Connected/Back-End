import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly profileId: number;
}

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
