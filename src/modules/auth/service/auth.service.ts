import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: UpdateUserDTO): Promise<any> {
    const user = await this.userRepo.findOneBy({ email: payload.email });
    if (!user) {
      throw new BadRequestException('Usuario o contraseña incorrectas');
    }

    const validatePass = await bcrypt.compare(payload.password, user.password);

    if (!payload.password || validatePass === false) {
      throw new BadRequestException('Usuario o contraseña incorrectas');
    }

    return user;
  }

  async login(payload: UpdateUserDTO) {
    const user = await this.validateUser(payload);

    // console.log({ user: user.id, email: user.email });
    const _payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(_payload),
    };
  }
}
