import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Get()
  getHello(): string {
    return this.AuthService.getHello();
  }
}
