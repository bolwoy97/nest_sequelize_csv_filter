import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addProductDto, updateProductDto } from './product.dtos';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async updateById(id: string, data: updateProductDto) {
    const product = await this.productModel.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new HttpException('Wrong product', HttpStatus.BAD_REQUEST);
    }
    return product.update({
      ...data,
    });
  }

  async getById(id: string) {
    const product = await this.productModel.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new HttpException('Wrong product', HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  async add(data: addProductDto) {
    const product = new Product();
    Object.assign(product, {
      ...data,
    });
    return product.save();
  }
}
