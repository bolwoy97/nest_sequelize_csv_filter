import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/jwt-auth.guard';
import { addProductDto } from './product.dtos';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addProduct(@Body() data: addProductDto): Promise<any> {
    return this.productService.addProduct(data);
  }
}
