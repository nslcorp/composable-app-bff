import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { stringify as stringifyQS } from 'qs';
import { mapProducts } from './handlers/mapProducts';
import { mapProductVariants } from './handlers/mapProductVariants';

const apiUrl = 'https://magento.test/rest/all/V1/products?';

@Injectable()
export class ProductsService {
  async getProductById(id) {
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

    const variantIds = products.reduce((ids, product) => {
      if (
        product.extension_attributes.configurable_product_links &&
        product.extension_attributes.configurable_product_links.length > 0
      ) {
        ids.push(...product.extension_attributes.configurable_product_links);
      }
      return ids;
    }, []);

    const variants = await this.getProductsByCategory(variantIds);
    // console.log(variants);

    const productsWithVariants = products.map((product) => {
      const productLinks =
        product.extension_attributes.configurable_product_links.map((id) =>
          id.toString(),
        );
      if (
        product.extension_attributes.configurable_product_links &&
        product.extension_attributes.configurable_product_links.length > 0
      ) {
        const productVariants = variants.filter((variant) =>
          productLinks.includes(variant.id),
        );
        product.variants = productVariants;
      }
      return product;
    });

    return mapProducts(productsWithVariants);
  }

  async getProductsByCategory(ids: string[]) {
    try {
      const params = {
        search_criteria: {
          filter_groups: [
            {
              filters: [
                {
                  field: 'entity_id',
                  value: ids.join(','),
                  condition_type: 'in',
                },
              ],
            },
          ],
        },
      };
      const response = await axios.get(apiUrl + stringifyQS(params), {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      return mapProductVariants(response.data.items);
    } catch (error) {
      throw new Error('Error fetching variants: ' + error.message);
    }
  }
}
