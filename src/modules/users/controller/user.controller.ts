import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/guards/auth/auth.guard';
import { AuthenticatedGuard } from 'src/guards/authenticated/authenticated.guard';
import { AuthService } from 'src/modules/auth/service/auth.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  hour = 1000 * 60 * 60;

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  async login(
    @Body() payload: UpdateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const cookie = await this.userService.login(payload);
    // res.cookie('access_token', cookie, {
    //   expires: new Date(Date.now() + this.hour * 4),
    // });
    // // return res.json({ access_token: cookie });
    // return { access_token: cookie };

    return this.authService.login(payload);
  }

  @Get('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await request.cookies['access_token'];
    if (!access_token) {
      throw new UnauthorizedException('No has iniciado sesión');
    }

    res.cookie('access_token', '', { expires: new Date(Date.now()) });

    return { message: 'Has cerrado sesión' };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDTO,
  ) {
    return this.userService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
