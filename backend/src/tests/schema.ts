import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Questions } from '../questions/schema';

export type TestDocument = Test & Document;

@Schema()
export class Test {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questions' }] })
  questions: Questions[];

  @Prop()
  created_at: Date;
}

export const TestSchema = SchemaFactory.createForClass(Test);