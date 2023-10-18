import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { Product, ProductVariant } from '../../types';
import { CommercetoolsSDK } from '../../utils/CommercetoolSDK';
import * as process from 'process';

@Injectable()
export class ProductServiceCommerce extends ProductsService {
  constructor(private readonly commerceSdk: CommercetoolsSDK) {
    super();
  }

  async getProductById(categoryId: string): Promise<Product[]> {
    console.log("Service.getProductById", { categoryId });
    const data = await this.commerceSdk.api
      .productProjections()
      .search()
      .get({ queryArgs: { filter: `categories.id:"${categoryId}"` } })
      .execute();

    const mappedData = data.body.results.map((product) => {
      const data: Product = {
        id: product.id,
        name: product.name[process.env.COMMERCE_TOOLS_LOCALE],
        description: product.description[process.env.COMMERCE_TOOLS_LOCALE],
        slug: product.slug[process.env.COMMERCE_TOOLS_LOCALE],
        variants: product.variants.map((variant) => ({
          id: variant.id,
          sku: variant.sku,
          slug: product.slug[process.env.COMMERCE_TOOLS_LOCALE],
          prices: variant.prices.map((price) => ({
            value: {
              currencyCode: price.value.currencyCode,
              centAmount: price.value.centAmount,
            },
          })),
          images: variant.images.map((image) => ({ url: image.url })),
          attributes: [
            {
              color: variant.attributes.find((attr) => attr.name === 'Color')?.value.key,
              size: variant.attributes.find((attr) => attr.name === 'Size')?.value.key,
            },
          ],
        })),
      };
      return data;
    });
    // @ts-ignore
    return mappedData;
  }
}
