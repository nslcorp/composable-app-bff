import { MagentoProduct, Product, ProductVariant } from '../../../types';

export const mapProducts = (magentoProducts: MagentoProduct[]) => {
  return magentoProducts.map((record) => {
    const product: Product = {
      // ...record,
      id: record.id.toString(),
      name: record.name,

      description: record.custom_attributes.find(
        (attr) => attr.attribute_code === 'description',
      )?.value,
      slug: record.custom_attributes.find(
        (attr) => attr.attribute_code === 'url_key',
      )?.value,
      variants: record.variants as ProductVariant[],
    };

    return product;
  });
};
