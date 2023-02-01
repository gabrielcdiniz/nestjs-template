import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public sayHello() {
    return 'hello world !';
  }
}
