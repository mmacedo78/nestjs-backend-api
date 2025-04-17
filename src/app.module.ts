import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/datasource/typeorm.module';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [TypeOrmModule, UserModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
