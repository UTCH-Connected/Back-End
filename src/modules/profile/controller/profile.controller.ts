import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateProfileDTO) {
    return this.profileService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProfileDTO) {
    return this.profileService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.profileService.delete(id);
  }
}
