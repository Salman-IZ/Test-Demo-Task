import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Results, ResultsDocument } from "./schema";  

@Injectable()
export class Service {
  constructor(@InjectModel(Results.name) private model: Model<ResultsDocument>){}

  async getAll(){
    return await this.model.find().populate('test');
  }

  async addResult(data){ 
    data.created_at = new Date();
    const query = await new this.model(data);
    return query.save();
  }
}
