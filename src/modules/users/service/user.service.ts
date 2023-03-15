import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

import { User } from '../entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  // private jwtService: JwtService,

  async findAll() {
    const users = await this.userRepo.find();
    if (!users) throw new NotFoundException('No se encontraron Usuarios');

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('No se encontró al usuario');

    return user;
  }

  async create(payload: CreateUserDTO) {
    const user = await this.userRepo.findOneBy({ email: payload.email });
    if (user) throw new BadRequestException('El usuario ya existe');

    const saltRounds = 10;
    const password = payload.password;
    const hash = await bcrypt.hash(password, saltRounds);

    payload.password = hash;

    const newUser = this.userRepo.create(payload);

    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDTO) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('No se encontró al usuario');

    if (changes.password) {
      const saltRounds = 10;
      const password = changes.password;
      const hash = await bcrypt.hash(password, saltRounds);
      changes.password = hash;
    }

    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('El usuario no existe');

    return this.userRepo.delete({ id });
  }

  // async login(payload: UpdateUserDTO) {
  //   const email = payload.email;
  //   const password = payload.password;

  //   const user = await this.userRepo.findOne({ where: { email } });

  //   if (!user) throw new BadRequestException('Wrong email or password');

  //   const login = await bcrypt.compare(password, user.password);

  //   if (!login) throw new BadRequestException('Wrong email or password');

  //   const jwt = await this.jwtService.signAsync({ id: user.id });

  //   const decoded = this.jwtService.decode(jwt);

  //   decoded['id'];

  //   console.log(decoded['id']);

  //   return jwt;
  // }
}
