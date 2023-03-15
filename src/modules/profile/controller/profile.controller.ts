import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDTO, UpdateProfileDTO } from '../dtos/profile.dto';
import { ProfileService } from '../service/profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getAll() {
    return this.profileService.getAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreateProfileDTO) {
    return this.profileService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProfileDTO) {
    return this.profileService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.profileService.delete(id);
  }
}
