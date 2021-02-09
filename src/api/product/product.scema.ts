import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({
    default: new Date(),
  })
  created: Date;

  @Prop({
    unique : true
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
