import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { Test, TestDocument } from "./schema";  

const mongoose = require('mongoose');

@Injectable()
export class Service {
  constructor(@InjectModel(Test.name) private model: Model<TestDocument>){}

  async getAll(){
    return await this.model.find().populate('questions');
  }

  async addTest(data){
    data.created_at = new Date();
    const query = await new this.model(data);
    return query.save();
  }

  async findTestById(id){ 
    if(mongoose.Types.ObjectId.isValid(id)){
      return await this.model.findOne({"_id" : id}).populate('questions');
    }
  } 
}
