import { AddCartItem, Cart } from '../../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CartService {
  async createCart(): Promise<{ cartId: string }> {
    throw new Error('Method not implemented.');
  }
  async getCart(cartId: string): Promise<any> {}
  async addItemToCart(cartId: string, data: AddCartItem): Promise<any> {}
  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }): Promise<any> {}
  async removeItemFromCart(cartId: string, itemId: string): Promise<any> {}

  async putOrder(cartId: string): Promise<any> {}
  async setShippingAddress(cartId: string): Promise<any> {}
}
