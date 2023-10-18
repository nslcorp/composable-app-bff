import { TempService } from './TempService';
import { Injectable } from '@nestjs/common';
import { CommercetoolsSDK } from '../../utils/CommercetoolSDK';
import * as process from 'process';

@Injectable()
export class TempCommerceService implements TempService {
  constructor(private readonly commerceSdk: CommercetoolsSDK) {
  }
  async getRoot() {
    return this.commerceSdk.api.categories().get().execute();

    // return 'Hello from TempCommerceService!';
  }
}
