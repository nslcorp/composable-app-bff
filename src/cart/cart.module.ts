import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CommercetoolsSDK } from '../utils/CommercetoolSDK';
import { getDataProvider } from '../utils/getDataProvider';
import { NodeDataProvider } from '../types';
import { CartServiceCommerce } from './services/CartServiceCommerce';
import { CartServiceMagento } from './services/CartServiceMagento';
import { CartService } from './services/CartService';

@Module({
  controllers: [CartController],
  providers: [
    {
      provide: CartService,
      useClass:
        getDataProvider() === NodeDataProvider.COMMERCE_TOOLS ? CartServiceCommerce : CartServiceMagento,
    },
    CommercetoolsSDK,
  ],
})
export class CartModule {}
