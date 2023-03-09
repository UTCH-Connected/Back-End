import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDTO, UpdateProfileDTO } from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async get(id: number) {
    const profile = await this.profileRepo.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException('No se encontraron datos del perfil');
    }

    return profile;
  }

  create(payload: CreateProfileDTO) {
    const newProfile = this.profileRepo.create(payload);

    return this.profileRepo.save(newProfile);
  }

  async update(id: number, changes: UpdateProfileDTO) {
    const profile = await this.profileRepo.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException('No se encontraron datos del perfil');
    }

    this.profileRepo.merge(profile, changes);
    return this.profileRepo.save(profile);
  }

  async delete(id: number) {
    const profile = await this.profileRepo.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException('El perfil no existe');
    }

    return this.profileRepo.delete({ id });
  }
}