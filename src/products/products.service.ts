import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { stringify as stringifyQS } from 'qs';

const apiUrl = 'https://magento.test/rest/all/V1/products?';

@Injectable()
export class ProductsService {
  async findByID(id) {
    const params = {
      search_criteria: {
        filter_groups: [
          {
            filters: [
              {
                field: 'type_id',
                value: 'configurable',
                condition_type: 'eq',
              },
              {
                field: 'category_id',
                value: id, // here you have to provide id of selected category
                condition_type: 'in',
              },
            ],
          },
        ],
        page_size: 10,
        current_page: 0,
      },
    };
    const productsResponse = await axios.get(apiUrl + stringifyQS(params), {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    const products = productsResponse.data.items;
    return products;
  }
}
