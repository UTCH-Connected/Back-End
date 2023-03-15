import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDTO, UpdateProfileDTO } from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async getAll() {
    const profiles = await this.profileRepo.find();
    if (!profiles) throw new NotFoundException('No se encontraron perfiles');

    return profiles;
  }

  async getOne(id: number) {
    const profile = await this.profileRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException('No se encontraron datos del perfil');
    }

    return profile;
  }

  async create(payload: CreateProfileDTO) {
    const newProfile = this.profileRepo.create(payload);
    if (payload.userId) {
      const user = await this.userRepo.findOneBy({ id: payload.userId });
      newProfile.user = user;
    }

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
