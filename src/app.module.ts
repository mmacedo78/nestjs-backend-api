import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [UserModule, ProductModule, PurchaseModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
