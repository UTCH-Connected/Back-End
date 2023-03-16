import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { PostService } from '../service/post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreatePostDTO) {
    return this.postService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdatePostDTO) {
    return this.postService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
