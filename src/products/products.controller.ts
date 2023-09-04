import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  findAll(@Param('id') id: string) {
    console.log(id);
    if (!id) {
      throw new NotFoundException('Missing mandatory param: id');
    }
    return this.productsService.findByID(id);
  }
}
