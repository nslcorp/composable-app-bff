import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { getDataProvider } from '../utils/getDataProvider';
import { NodeDataProvider } from '../types';
import { CategoriesServiceCommerce } from './services/CategoriesServiceCommerce';
import { CategoriesServiceMagento } from './services/CategoriesServiceMagento';
import { CategoriesService } from './services/CategoriesService';
import { CommercetoolsSDK } from '../utils/CommercetoolSDK';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategoriesService,
      useClass:
        getDataProvider() === NodeDataProvider.COMMERCE_TOOLS
          ? CategoriesServiceCommerce
          : CategoriesServiceMagento,
    },
    CommercetoolsSDK,
  ],
})
export class CategoriesModule {}
