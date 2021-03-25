import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionsDocument = Questions & Document;

@Schema()
export class Questions { 
  @Prop()
  title: string;

  @Prop()
  serial_no: number;

  @Prop([String])
  options: string[];

  @Prop()
  answer: string;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);