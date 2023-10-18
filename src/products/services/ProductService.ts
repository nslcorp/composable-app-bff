import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from "../../types";

export abstract class ProductService {
  getProductById(categoryId: string): Promise<Product[]> {
    throw new NotFoundException('Method not implemented.');
  }
}
