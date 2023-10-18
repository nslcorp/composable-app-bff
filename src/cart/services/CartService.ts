import { AddCartItem } from "../../types";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class CartService {
  async createCart(): Promise<{ cartId: string }> {
    throw new Error('Method not implemented.');
  }
  async getCart(cartId: string): Promise<any> {}
  async addItemToCart(cartId: string, data: AddCartItem) {}
  async changeItemsAtCart(cartId: string, itemId: string, data: { qty: number }) {}
  async removeItemFromCart(cartId: string, itemId: string) {}


  async putOrder(cartId: string) {}
  async setShippingAddress(cartId: string) {}
}