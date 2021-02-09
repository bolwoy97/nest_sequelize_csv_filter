import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './api/app/app.controller';
import { AppService } from './api/app/app.service';
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testove',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
