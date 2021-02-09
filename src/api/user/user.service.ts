import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { loginDto, registerDto, resetPswDto } from './user.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async resetPsw(id, data: resetPswDto) {
    const user = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('Wrong user', HttpStatus.BAD_REQUEST);
    }
    const hashedPsw = await bcrypt.hash(data.password, 10);
    return user.update({
      password: hashedPsw,
    });
  }

  async register(data: registerDto) {
    const hashedPsw = await bcrypt.hash(data.password, 10);
    const user = new User();
    Object.assign(user, {
      ...data,
      password: hashedPsw,
    });
    return user.save();
  }

  async login(data: loginDto) {
    const user = await this.userModel.findOne({
      where: {
        username: data.username,
      },
    });
    if (!user) {
      throw new HttpException(
        'Wrong username provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordMatching = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
