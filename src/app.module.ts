import { Module } from '@nestjs/common';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { UserModule } from './models/user/user.module';
import { ProductModule } from './models/product/product.module';
import { CategoryModule } from './models/category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule, UserModule, ProductModule, CategoryModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
