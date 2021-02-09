import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './api/app/app.controller';
import { AppService } from './api/app/app.service';
import { AuthController } from './api/auth/auth.controller';
import { AuthModule } from './api/auth/auth.module';
import { AuthService } from './api/auth/auth.service';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forRoot("mongodb://localhost:27017/testove", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
