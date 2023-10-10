import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { AddCartItem } from '../types';

const baseUrl = 'https://magento.test/rest/default/V1/guest-carts';

@Injectable()
export class CartService {
  async createCart(): Promise<{ cartId: string }> {
    try {
      const response = await axios.post(
        baseUrl,
        {},
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );

      const data = { cartId: response.data };

      return data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async getCart(cartId: string) {
    const apiUrl = `${baseUrl}/${cartId}`;

    try {
      const response = await axios.get(apiUrl, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      const cartData = {
        id: response.data.id.toString(),
        customerId: response.data.customer.email,
        lineItems: response.data.items.map((item) => ({
          id: item.item_id.toString(),
          quantity: item.qty,
          totalPrice: item.qty * item.price,
          variant: {
            sku: item.sku,
            name: item.name,
            prices: [{ value: { currencyCode: 'USD', centAmount: item.price * 100 } }],
          },
        })),
      };

      return cartData;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async addItemToCart(cartId: string, data: AddCartItem) {
    const apiUrl = `${baseUrl}/${cartId}/items`;

    if (!data.qty || !data.sku) {
      throw new HttpException(`Missing parameters: sku:${data.sku}, qty:${data.qty}`, 400);
    }

    try {
      const response = await axios.post(
        apiUrl,
        {
          cartItem: data,
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );

      return response.data;
    } catch (error) {
      const status = error.response.status;
      const message = error.response.data.message;

      throw new HttpException(message, status);
    }
  }

  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }) {
    const apiUrl = `${baseUrl}/${cartId}/items/${itemId}`;

    if (!data.qty) {
      throw new HttpException(`Missing parameters: qty:${data.qty}`, 400);
    }

    try {
      const response = await axios.put(
        apiUrl,
        {
          cartItem: {
            qty: data.qty,
          },
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );

      return response.data;
    } catch (error) {
      const message = error.response.data.message || 'Unhandled error at changeItemsAtCart ';
      throw new HttpException(message, error.response.status);
    }
  }

  async removeItemFromCart(cartId: string, itemId: string) {
    const apiUrl = `${baseUrl}/${cartId}/items/${itemId}`;
    try {
      const response = await axios.delete(apiUrl, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async putOrder(cartId: string) {
    const apiUrl = `${baseUrl}/${cartId}/order`;
    try {
      const response = await axios.put(apiUrl, {
        paymentMethod: {
          method: 'checkmo',
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response.data.message || 'Unhandled error';
      throw new HttpException(message, error.response.status);
    }
  }
}

//getCart {
//   id: 9,
//   created_at: '2023-09-28 10:22:11',
//   updated_at: '2023-09-28 10:22:11',
//   is_active: true,
//   is_virtual: false,
//   items: [],
//   items_count: 0,
//   items_qty: 0,
//   customer: { email: null, firstname: null, lastname: null },
//   billing_address: {
//     id: 18,
//     region: null,
//     region_id: null,
//     region_code: null,
//     country_id: null,
//     street: [ '' ],
//     telephone: null,
//     postcode: null,
//     city: null,
//     firstname: null,
//     lastname: null,
//     email: null,
//     same_as_billing: 0,
//     save_in_address_book: 0
//   },
//   orig_order_id: 0,
//   currency: {
//     global_currency_code: 'USD',
//     base_currency_code: 'USD',
//     store_currency_code: 'USD',
//     quote_currency_code: 'USD',
//     store_to_base_rate: 0,
//     store_to_quote_rate: 0,
//     base_to_global_rate: 1,
//     base_to_quote_rate: 1
//   },
//   customer_is_guest: true,
//   customer_note_notify: true,
//   customer_tax_class_id: 3,
//   store_id: 1,
//   extension_attributes: { shipping_assignments: [] }
// }

// Cart Response
// {
//     "id": 36,
//     "created_at": "2023-10-02 12:17:30",
//     "updated_at": "2023-10-02 12:26:37",
//     "is_active": true,
//     "is_virtual": false,
//     "items": [
//         {
//             "item_id": 12,
//             "sku": "WJ01-S-Blue",
//             "qty": 5,
//             "name": "Stellar Solar Jacket-S-Blue",
//             "price": 75,
//             "product_type": "simple",
//             "quote_id": "36"
//         }
//     ],
//     "items_count": 1,
//     "items_qty": 5,
//     "customer": {
//         "email": null,
//         "firstname": null,
//         "lastname": null
//     },
//     "billing_address": {
//         "id": 72,
//         "region": null,
//         "region_id": null,
//         "region_code": null,
//         "country_id": null,
//         "street": [
//             ""
//         ],
//         "telephone": null,
//         "postcode": null,
//         "city": null,
//         "firstname": null,
//         "lastname": null,
//         "email": null,
//         "same_as_billing": 0,
//         "save_in_address_book": 0
//     },
//     "orig_order_id": 0,
//     "currency": {
//         "global_currency_code": "USD",
//         "base_currency_code": "USD",
//         "store_currency_code": "USD",
//         "quote_currency_code": "USD",
//         "store_to_base_rate": 0,
//         "store_to_quote_rate": 0,
//         "base_to_global_rate": 1,
//         "base_to_quote_rate": 1
//     },
//     "customer_is_guest": true,
//     "customer_note_notify": true,
//     "customer_tax_class_id": 3,
//     "store_id": 1,
//     "extension_attributes": {
//         "shipping_assignments": [
//             {
//                 "shipping": {
//                     "address": {
//                         "id": 73,
//                         "region": null,
//                         "region_id": null,
//                         "region_code": null,
//                         "country_id": null,
//                         "street": [
//                             ""
//                         ],
//                         "telephone": null,
//                         "postcode": null,
//                         "city": null,
//                         "firstname": null,
//                         "lastname": null,
//                         "email": null,
//                         "same_as_billing": 1,
//                         "save_in_address_book": 0
//                     },
//                     "method": null
//                 },
//                 "items": [
//                     {
//                         "item_id": 12,
//                         "sku": "WJ01-S-Blue",
//                         "qty": 5,
//                         "name": "Stellar Solar Jacket-S-Blue",
//                         "price": 75,
//                         "product_type": "simple",
//                         "quote_id": "36"
//                     }
//                 ]
//             }
//         ]
//     }
// }
