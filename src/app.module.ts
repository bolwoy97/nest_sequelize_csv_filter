import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';
import { CsvFilterModule } from './api/csvFilter/csvFilter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dbKeys } from './keys';

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
      host: dbKeys.host,
      port: dbKeys.port,
      username: dbKeys.username,
      password: dbKeys.password,
      database: dbKeys.database,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
