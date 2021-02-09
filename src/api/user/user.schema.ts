import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({
    default: new Date(),
  })
  registered: Date;

  @Prop({
    unique : true
  })
  username: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
