import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { Posts } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async getAll() {
    const posts = await this.postRepo.find();
    if (!posts) throw new NotFoundException('No se encontraron posts');

    return posts;
  }

  async getOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!post) throw new NotFoundException('No se encontró el post');

    return post;
  }

  async create(payload: CreatePostDTO) {
    const newPost = this.postRepo.create(payload);
    if (payload.profileId) {
      const profile = await this.profileRepo.findOneBy({
        id: payload.profileId,
      });
      newPost.profile = profile;
    }

    return this.postRepo.save(newPost);
  }

  async update(id: number, changes: UpdatePostDTO) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException('No se encontró el post');

    this.postRepo.merge(post, changes);

    return this.postRepo.save(post);
  }

  async delete(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException('El post no existe');

    return this.postRepo.delete({ id });
  }
}
