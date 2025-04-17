import { Module } from '@nestjs/common';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { UserModule } from './models/user/user.module';
import { ProductModule } from './models/product/product.module';
import { CategoryModule } from './models/category/category.module';

@Module({
  imports: [TypeOrmModule, UserModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
