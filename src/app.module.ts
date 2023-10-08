import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
     isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'api-rest-compra-venta',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
  }), 
    ProductsModule,
    UsersModule,
    CategoriesModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
