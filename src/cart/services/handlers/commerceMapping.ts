import { Cart as CartResponse } from '@commercetools/platform-sdk';
import { Cart } from '../../../types';

export const mapCommerceCart = (cartResponse: CartResponse) => {
  const { id, customerId, lineItems, version } = cartResponse;
  const data: Cart = {
    id,
    customerId,
    version,
    lineItems: lineItems.map((record) => ({
      id: record.id,
      quantity: record.quantity,
      totalPrice: record.totalPrice.centAmount / 100,
      variant: {
        sku: record.variant.sku,
        name: record.name[process.env.COMMERCE_TOOLS_LOCALE],
        prices: [
          {
            value: {
              currencyCode: record.price.value.currencyCode,
              centAmount: record.price.value.centAmount,
            },
          },
        ],
      },
    })),
  };

  return data;
};
