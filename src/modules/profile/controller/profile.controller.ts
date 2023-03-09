import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDTO, UpdateProfileDTO } from '../dtos/profile.dto';
import { ProfileService } from '../service/profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.get(id);
  }

  @Post()
  create(@Body() payload: CreateProfileDTO) {
    return this.profileService.create(payload);
  }

  @Put()
  update(@Param() id: number, @Body() payload: UpdateProfileDTO) {
    return this.profileService.update(id, payload);
  }
}
