import { HttpException, Injectable } from '@nestjs/common';
import { axiosRequest } from '../../utils/axiosRequest';
import { AddCartItem, Cart, CartLineItems, Order } from "../../types";
import { handleErrors } from '../../utils/handleErrors';
import { CartService } from './CartService';

@Injectable()
export class CartServiceMagento implements CartService {
  async createCart(): Promise<{ cartId: string }> {
    try {
      const response = await axiosRequest.post('guest-carts');

      const data = { cartId: response.data };

      return data;
    } catch (error) {
      handleErrors(error);
    }
  }

  async getCart(cartId: string) {
    try {
      const response = await axiosRequest.get(`guest-carts/${cartId}`);

      const lineItems = response.data.items
        ? response.data.items.map((item) => {
            const data: CartLineItems = {
              id: item.item_id.toString(),
              quantity: item.qty,
              totalPrice: item.qty * item.price,
              variant: {
                sku: item.sku,
                name: item.name,
                prices: [{ value: { currencyCode: 'USD', centAmount: item.price * 100 } }],
              },
            };
            return data;
          })
        : [];

      const cartData: Cart = {
        id: response.data.id.toString(),
        customerId: response.data.customer.email,
        lineItems,
      };

      return cartData;
    } catch (error) {
      handleErrors(error);
    }
  }

  async addItemToCart(cartId: string, data: AddCartItem) {
    if (!data.qty || !data.sku) {
      throw new HttpException(`Missing parameters: sku:${data.sku}, qty:${data.qty}`, 400);
    }

    try {
      const response = await axiosRequest.post(`guest-carts/${cartId}/items`, {
        cartItem: data,
      });

      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  }

  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }) {
    if (!data.qty) {
      throw new HttpException(`Missing parameters: qty:${data.qty}`, 400);
    }

    try {
      const response = await axiosRequest.put(`guest-carts/${cartId}/items/${itemId}`, {
        cartItem: {
          qty: data.qty,
        },
      });

      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  }

  async removeItemFromCart(cartId: string, itemId: string) {
    try {
      const response = await axiosRequest.delete(`guest-carts/${cartId}/items/${itemId}`);

      return response.data;
    } catch (error) {
      handleErrors(error);
    }
  }

  async putOrder(cartId: string): Promise<Order> {
    try {
      await this.setShippingAddress(cartId);

      const response = await axiosRequest.put(`guest-carts/${cartId}/order`, {
        paymentMethod: {
          method: 'checkmo',
        },
      });
      const data = { id: response.data };
      return data;
    } catch (error) {
      handleErrors(error);
    }
  }

  async setShippingAddress(cartId: string) {
    try {
      const response = await axiosRequest.post(`guest-carts/${cartId}/shipping-information`, {
        addressInformation: {
          shipping_address: {
            region: 'Berlin',
            region_code: 'BER',
            country_id: 'DE',
            street: ['Kurfursterdamm 194'],
            telephone: '015712345679',
            postcode: '10285',
            city: 'Berlin',
            firstname: 'Name',
            lastname: 'Lastname',
            email: 'nuccccll@gmail.com',
          },
          billing_address: {
            region: 'Berlin',
            region_code: 'BER',
            country_id: 'DE',
            street: ['Kurfursterdamm 194'],
            telephone: '015712345679',
            postcode: '10285',
            city: 'Berlin',
            firstname: 'Name',
            lastname: 'Lastname',
            email: 'nuccccll@gmail.com',
          },
          shipping_method_code: 'flatrate',
          shipping_carrier_code: 'flatrate',
        },
      });
      return response.data;
    } catch (error) {
      handleErrors(error);
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
