import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/jwt/jwt-auth.guard';
import { addProductDto, updateProductDto } from './product.dtos';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(@Query('id') id: string): Promise<any> {
    return this.productService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addProduct(@Body() data: addProductDto): Promise<any> {
    return this.productService.add(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() data: updateProductDto
    ): Promise<any> {
    return this.productService.updateById(id, data);
  }

}
