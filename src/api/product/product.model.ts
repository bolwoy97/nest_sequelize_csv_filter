
import { Column, Model, Table } from 'sequelize-typescript';
import { DECIMAL } from 'sequelize';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  description: string;

  @Column( DECIMAL(10, 2 ) )
  price: number;

  
}