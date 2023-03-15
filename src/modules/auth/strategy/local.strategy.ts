import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(payload: UpdateUserDTO): Promise<any> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }
    return user;
  }
}
