import { Module } from '@nestjs/common';
import { TempController } from './temp.controller';
import { TempCommerceService } from './services/TempCommerceService';
import { TempService } from './services/TempService';
import { getDataProvider } from '../utils/getDataProvider';
import { NodeDataProvider } from '../types';
import { TempMagentoService } from './services/TempMagentoService';
import { CommercetoolsSDK } from '../shared/CommercetoolSDK';

const getProviderClass = () => {
  const dataProvider = getDataProvider();
  if (dataProvider === NodeDataProvider.COMMERCE_TOOLS) {
    return TempCommerceService;
  }
  return TempMagentoService;
};

@Module({
  controllers: [TempController],
  providers: [{ provide: TempService, useClass: getProviderClass() }, CommercetoolsSDK],
})
export class TempModule {}
