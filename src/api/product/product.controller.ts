import { Body, Controller, Post } from '@nestjs/common';
import { addProductDto } from './product.dtos';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async addProduct(@Body() data: addProductDto): Promise<any> {
    return this.productService.addProduct(data);
  }
}
