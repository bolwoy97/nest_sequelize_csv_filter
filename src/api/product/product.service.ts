import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addProductDto } from './product.dtos';
import { Product, ProductDocument } from './product.scema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async addProduct(data: addProductDto) {
    const newProduct = new this.productModel({ ...data });
    await newProduct.save();
    return newProduct;
  }
  
}
