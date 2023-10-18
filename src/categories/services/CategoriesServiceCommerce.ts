import { CategoriesService } from './CategoriesService';
import { Injectable } from '@nestjs/common';
import { handleErrors } from '../../utils/handleErrors';
import { CommercetoolsSDK } from '../../utils/CommercetoolSDK';
import { mapCategoriesFromCommerce } from "./handlers/mapCateforiesFromCommerce";

@Injectable()
export class CategoriesServiceCommerce extends CategoriesService {
  constructor(private readonly commerceSdk: CommercetoolsSDK) {
    super();
  }

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
