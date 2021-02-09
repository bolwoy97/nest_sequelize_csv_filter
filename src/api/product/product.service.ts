import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addProductDto, updateProductDto } from './product.dtos';
import { Product, ProductDocument } from './product.scema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async updateById(id:string, data: updateProductDto) {
    const res = await this.productModel.updateOne(
      {_id: id},
      {
        ...data
      },
      { upsert: false }
    );
    return res;
  }

  async getById(id: string) {
    const product = await this.productModel.findOne({_id: id});
    if (!product) {
      throw new HttpException('Wrong product', HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  async add(data: addProductDto) {
    const newProduct = new this.productModel({ ...data });
    await newProduct.save();
    return newProduct;
  }
  
}
