import { Body, Controller, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { loginDto, registerDto, resetPswDto } from './user.dtos';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async register(
    @Body() data: registerDto
  ): Promise<any> {
    return this.userService.register(data);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async resetPsw(
    @Request() req,
    @Body() data : resetPswDto
  ): Promise<any> {
    return this.userService.resetPsw(req.user._id, data);
  }

  @Post('login')
  async login(
    @Body() data: loginDto
  ): Promise<any> {
    return this.userService.login(data);
  }


}
