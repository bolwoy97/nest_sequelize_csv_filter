import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';
import { loginDto, registerDto, resetPswDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async resetPsw(id, data: resetPswDto) {
    const user = await this.userModel.findOne({_id: id});
    if (!user) {
      throw new HttpException('Wrong user', HttpStatus.BAD_REQUEST);
    }
    const res = await this.userModel.updateOne(
      {_id: id},
      {
        password: data.password
      }
    );

    return res;
  }

  async register(user: registerDto) {
    const hashedPsw = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: hashedPsw });
    await newUser.save();
    return newUser;
  }

  async login(data: loginDto) {
    const user = await this.userModel.findOne({username: data.username});
    if (!user) {
      throw new HttpException('Wrong username provided', HttpStatus.BAD_REQUEST);
    }
      const isPasswordMatching = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
      const payload = {  _id: user._id, username: user.username };
      return {
        accessToken: this.jwtService.sign(payload),
      };
  }

}
