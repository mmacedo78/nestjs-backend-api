import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [TypeOrmModule, UserModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
