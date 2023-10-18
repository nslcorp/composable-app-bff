import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CommercetoolsSDK } from "../utils/CommercetoolSDK";
import { getDataProvider } from "../utils/getDataProvider";
import { NodeDataProvider } from "../types";
import { ProductServiceCommerce } from "./services/ProductServiceCommerce";
import { ProductServiceMagento } from "./services/ProductServiceMagento";
import { ProductService } from "./services/ProductService";

@Module({
  controllers: [ProductsController],
  providers: [
    CommercetoolsSDK,
    {
      provide: ProductService,
      useClass:
        getDataProvider() === NodeDataProvider.COMMERCE_TOOLS
          ? ProductServiceCommerce
          : ProductServiceMagento,
    },
  ],
})
export class ProductsModule {}
