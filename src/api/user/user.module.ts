import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { jwtConstants } from "src/keys";
import { JwtStrategy } from "src/modules/jwt/jwt.strategy";
import { UserController } from "./user.controller";
import { User } from "./user.model";
import { UserService } from "./user.service";


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: jwtConstants.expiresIn },
      }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [ UserService , JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
