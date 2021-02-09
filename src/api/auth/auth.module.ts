import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/keys";
import { JwtStrategy } from "src/modules/jwt.strategy";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "./auth.schema";
import { AuthService } from "./auth.service";


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: jwtConstants.expiresIn },
      }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ AuthService , JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
