import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from "./services/CartService";

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}



  @Get('/:cartId')
  async getCart(@Param('cartId') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Post('/:cartId/items')
  async addItemToCart(@Param('cartId') cartId: string, @Body() body: any) {
    return this.cartService.addItemToCart(cartId, body);
  }

  @Put('/:cartId/items/:itemId')
  async changeItemsAtCart(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() body: any,
  ) {
    console.log('here');
    return this.cartService.changeItemsAtCart(cartId, itemId, body);
  }

  @Delete('/:cartId/items/:itemId')
  async removeItemFromCart(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItemFromCart(cartId, itemId);
  }

  // Put Order
  @Put('/:cartId/order')
  async putOrder(@Param('cartId') cartId: string) {
    console.log(cartId);
    return this.cartService.putOrder(cartId);
  }

  @Post('/')
  async createCart() {
    return this.cartService.createCart();
  }
}
