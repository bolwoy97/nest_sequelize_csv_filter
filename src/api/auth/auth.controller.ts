import { Body, Controller, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/jwt-auth.guard';
import { AuthService } from './auth.service';
import { loginDto, registerDto, resetPswDto } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post()
  async register(
    @Body() data: registerDto
  ): Promise<any> {
    return this.authService.register(data);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async resetPsw(
    @Request() req,
    @Body() data : resetPswDto
  ): Promise<any> {
    return this.authService.resetPsw(req.user._id, data);
  }

  @Post('login')
  async login(
    @Body() data: loginDto
  ): Promise<any> {
    return this.authService.login(data);
  }


}
