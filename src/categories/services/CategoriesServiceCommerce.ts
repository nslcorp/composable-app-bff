import { CategoriesService } from './CategoriesService';
import { Injectable } from '@nestjs/common';
import { handleErrors } from '../../utils/handleErrors';
import { CommercetoolsSDK } from '../../shared/CommercetoolSDK';
import { mapCategoriesFromCommerce } from "./handler/mapCateforiesFromCommerce";

@Injectable()
export class CategoriesServiceCommerce implements CategoriesService {
  constructor(private readonly commerceSdk: CommercetoolsSDK) {}

  async fetchAll(): Promise<any[]> {
    try {
      const response = await this.commerceSdk.api.categories().get().execute();
      const data = response.body.results;
      return mapCategoriesFromCommerce(data);
    } catch (error) {
      handleErrors(error);
    }
  }
}
