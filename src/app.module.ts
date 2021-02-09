import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';
import { CsvFilterModule } from './api/csvFilter/csvFilter.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../uploads/`,
        serveRoot: '/uploads/',
    }),
    UserModule,
    ProductModule,
    CsvFilterModule,
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
})
export class AppModule {}
