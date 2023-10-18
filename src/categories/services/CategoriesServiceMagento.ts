import { Injectable } from '@nestjs/common';
import { CategoriesService } from './CategoriesService';
import { mapCategoriesFromMagento } from './handlers/mapCategoriesFromMagento';
import { axiosRequest } from '../../utils/axiosRequest';
import { handleErrors } from '../../utils/handleErrors';

@Injectable()
export class CategoriesServiceMagento extends CategoriesService {
  async fetchAll() {
    return axiosRequest
      .get('categories?rootCategoryId=2')
      .then((res) => {
        const data = res.data.children_data.filter((record) => record.name === 'Women');
        const mappedData = mapCategoriesFromMagento(data);
        return mappedData;
      })
      .catch(handleErrors);
  }
}
