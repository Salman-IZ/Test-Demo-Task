import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { Service } from './service'; 
import { Response } from 'express';
import { createQuestionDto } from "./dto/create-questions";

@Controller('questions')
export class QuestionsController {
  constructor(private readonly Service: Service) {}

  @Get()
  async getQuestions(@Res() res: Response) {
    const result =  await this.Service.getQuestions();
    if(result.length > 0){
      res.status(200).json({status:true, message:`${result.length} records found.`, result:result}).send();
    }else{
      res.status(200).json({status:false, message:'Record not found.'}).send();
    }
  }

  @Post()
  async postQuestions(@Res() res: Response, @Body() createQuestionDto: createQuestionDto){  
    const result = await this.Service.postQuestions(createQuestionDto);
    if(result){
      res.status(200).json({status:true, message:'Question has been added.', result:result}).send();
    }else{
      res.status(501).json({status:false, message:'Something went wrong. Please try again.'}).send();
    }
  }
}
