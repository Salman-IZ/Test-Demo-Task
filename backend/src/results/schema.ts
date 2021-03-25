import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Test } from '../tests/schema';

export type ResultsDocument = Results & Document;

@Schema()
export class Results { 
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  test: Test;

  @Prop()
  username: string;

  @Prop()
  duration: number;

  @Prop()
  result: string; 

  @Prop()
  created_at: Date;
}

export const ResultsSchema = SchemaFactory.createForClass(Results);