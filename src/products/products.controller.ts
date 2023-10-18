import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductService } from './services/ProductService';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get('/:id')
  getProducts(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('Missing mandatory param: id');
    }
    return this.productsService.getProductById(id);
  }

  // @Get("/variants/:id")
  // getVariants(@Param('id') id: string){
  //   return this.productsService.getProductsByCategory(['23']);
  // }
}
