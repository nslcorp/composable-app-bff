import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { mapCategories } from './handlers/mapCategories';

const apiUrl = 'https://magento.test/rest/all/V1/categories?rootCategoryId=2';

@Injectable()
export class CategoriesService {
  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  async findAll() {
    try {
      const response = await axios.get(apiUrl, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      const data = response.data.children_data.filter((record) => record.name === 'Women');
      const mappedData = mapCategories(data);
      return mappedData;
    } catch (error) {
      console.log(error);

      throw new NotFoundException(`Error: ${error.message}`);
    }
  }
}
