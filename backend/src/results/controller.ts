import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { Service } from './service'; 
import { Response } from 'express';
import { createResultDto } from "./dto/create-result";

@Controller()
export class ResultsController {
  constructor(private readonly Service: Service) {}
  
  @Get('results')
  async getAll(@Res() res: Response){
    const result = await this.Service.getAll();
    if(result.length > 0){
      res.status(200).json({status:true, message:`${result.length} records found.`, result:result}).send();
    }else{
      res.status(200).json({status:false, message:'Record not found.'}).send();
    }
  }

  @Post('results')
  async addResult(@Res() res: Response, @Body() createResultDto: createResultDto){ 
    const result = await this.Service.addResult(createResultDto);
    if(result){
      res.status(200).json({status:true, message:'Result has been submitted.', result:result}).send();
    }else{
      res.status(501).json({status:false, message:'Something went wrong. Please try again.'}).send();
    }
  }
}
