import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, QuestionsDocument } from "./schema"; 

@Injectable()
export class Service {
  constructor(@InjectModel(Questions.name) private model: Model<QuestionsDocument>){}

  async getQuestions(){
    return await this.model.find();
  }

  async postQuestions(Questions){
    const query = await new this.model(Questions);
    return query.save();
  }
}
