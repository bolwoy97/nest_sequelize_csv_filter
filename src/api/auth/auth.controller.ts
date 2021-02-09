import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dtos/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(
    @Body() data: registerDto
  ): Promise<any> {
    const res = await this.authService.register(data);
    return 'User created';
  }


}
