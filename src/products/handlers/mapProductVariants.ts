import { ProductVariant } from '../../types';

const urlPrefix  = 'https://magento.test/media/catalog/product'

export const mapProductVariants = (data: any) => {
  return data.map((record: any) => {
    const productVariant: ProductVariant = {
      id: record.id.toString(),
      sku: record.sku,
      prices: [
        { value: { currencyCode: 'USD', centAmount: record.price * 100 } },
      ],
      images: [
        {
          url: urlPrefix + record?.custom_attributes.find(
            (attr) => attr.attribute_code === 'image',
          )?.value,
        },
      ],
      attributes: [
        {
          color: record?.custom_attributes.find(
            (attr) => attr.attribute_code === 'color',
          )?.value,
          size: record?.custom_attributes.find(
            (attr) => attr.attribute_code === 'size',
          )?.value,
        },
      ],
      slug: record.custom_attributes.find(
        (attr) => attr.attribute_code === 'url_key',
      )?.value,
    };
    return productVariant;
  });
};

// "id": 23,
//   "sku": "24-UG03",
//   "name": "Harmony Lumaflex&trade; Strength Band Kit ",
//   "attribute_set_id": 11,
//   "price": 22,
//   "status": 1,
//   "visibility": 4,
//   "type_id": "simple",
//   "created_at": "2023-06-26 17:05:42",
//   "updated_at": "2023-06-26 17:05:42",
