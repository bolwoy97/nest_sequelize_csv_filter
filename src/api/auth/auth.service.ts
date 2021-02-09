import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';
import { registerDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async register(user: registerDto) {
    const hashedPsw = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: hashedPsw });
    await newUser.save();
    return newUser;
  }

}
