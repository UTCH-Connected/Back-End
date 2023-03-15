import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  status: {
    message: 'Server is running ';
  };

  getHello(): object {
    return { message: 'Server is running' };
  }
}
