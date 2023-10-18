import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { TempModule } from './temp/temp.module';

@Module({
  imports: [ProductsModule, CategoriesModule, CartModule, TempModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
