import { Injectable } from '@nestjs/common';
import { CartService } from './CartService';
import { AddCartItem } from '../../types';
import { CommercetoolsSDK } from '../../utils/CommercetoolSDK';

@Injectable()
export class CartServiceCommerce implements CartService {
  constructor(private readonly commercetoolsSDK: CommercetoolsSDK) {}

  async createCart(): Promise<{ cartId: string }> {
    return Promise.resolve({ cartId: '' });
  }

  async addItemToCart(cartId: string, data: AddCartItem): Promise<void> {
    return Promise.resolve(undefined);
  }

  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getCart(cartId: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  async putOrder(cartId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async removeItemFromCart(cartId: string, itemId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async setShippingAddress(cartId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
