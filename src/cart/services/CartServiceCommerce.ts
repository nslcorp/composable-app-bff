import { Injectable } from '@nestjs/common';
import { CartService } from './CartService';
import { AddCartItem, Cart, CartLineItems } from '../../types';
import { CommercetoolsSDK } from '../../utils/CommercetoolSDK';
import { handleErrors } from '../../utils/handleErrors';
import { mapCommerceCart } from './handlers/commerceMapping';
import { response } from 'express';
import { Order } from '@commercetools/platform-sdk';

@Injectable()
export class CartServiceCommerce implements CartService {
  constructor(private readonly commercetoolsSDK: CommercetoolsSDK) {}

  async createCart(): Promise<{ cartId: string }> {
    try {
      const data = await this.commercetoolsSDK.api
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();
      return { cartId: data.body.id };
    } catch (error) {
      handleErrors(error);
    }
  }

  async getCart(cartId: string): Promise<Cart> {
    return this.commercetoolsSDK.api
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()
      .then((response) => mapCommerceCart(response.body))
      .catch((error) => handleErrors(error));
  }

  async addItemToCart(cartId: string, cartItem: AddCartItem): Promise<any> {
    const cart = await this.getCart(cartId);
    return this.commercetoolsSDK.api
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'addLineItem',
              quantity: Number(cartItem.qty),
              sku: cartItem.sku,
            },
          ],
        },
      })
      .execute()
      .then((response) => response.body)
      .catch(handleErrors);
  }

  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }): Promise<any> {
    const cart = await this.getCart(cartId);

    return this.commercetoolsSDK.api
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version, //cart Version
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: itemId,
              quantity: data.qty,
            },
          ],
        },
      })
      .execute()
      .then((response) => response.body)
      .catch(handleErrors);
  }

  async removeItemFromCart(cartId: string, itemId: string): Promise<any> {
    const cart = await this.getCart(cartId);

    return this.commercetoolsSDK.api
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version, //cart Version
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: itemId,
            },
          ],
        },
      })
      .execute()
      .then((response) => response.body)
      .catch(handleErrors);
  }

  async putOrder(cartId: string): Promise<Order> {
    try {
      await this.setShippingAddress(cartId);
      const cart = await this.getCart(cartId);

      return this.commercetoolsSDK.api
        .orders()
        .post({
          body: {
            cart: {
              id: cartId,
              typeId: 'cart',
            },
            version: cart.version,
          },
        })
        .execute()
        .then((response) => response.body)
        .catch(handleErrors);
    } catch (error) {
      handleErrors(error);
    }
  }

  async setShippingAddress(cartId: string): Promise<any> {
    const cart = await this.getCart(cartId);

    return this.commercetoolsSDK.api
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'setShippingAddress',
              address: {
                key: 'exampleKey',
                title: 'My Address',
                salutation: 'Mr.',
                firstName: 'Example',
                lastName: 'Person',
                streetName: 'Example Street',
                streetNumber: '4711',
                additionalStreetInfo: 'Backhouse',
                postalCode: '80933',
                city: 'Exemplary City',
                region: 'Exemplary Region',
                country: 'DE',
                company: 'My Company Name',
                department: 'Sales',
                building: 'Hightower 1',
                apartment: '247',
                pOBox: '2471',
                phone: '+49 89 12345678',
                mobile: '+49 171 2345678',
                email: 'email@example.com',
                fax: '+49 89 12345679',
                additionalAddressInfo: 'no additional Info',
                externalId: 'Information not needed',
              },
            },
          ],
        },
      })
      .execute()
      .then((response) => response.body)
      .catch(handleErrors);
  }
}
