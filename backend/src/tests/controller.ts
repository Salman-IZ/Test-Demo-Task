import { Controller, Get, Post, Body, Param, Res} from '@nestjs/common';
import { Service } from './service'; 
import { Response } from 'express';
import { createTestDto } from "./dto/create-test"; 

@Controller()
export class TestController {
  constructor(private readonly Service: Service) {}

  @Get('tests')
  async getAll(@Res() res: Response){
    const result =  await this.Service.getAll();
    if(result.length > 0){
      res.status(200).json({status:true, message:`${result.length} records found.`, result:result}).send();
    }else{
      res.status(200).json({status:false, message:'Record not found.'}).send();
    }
  }

  @Get('tests/:id')
  async findTestById(@Res() res: Response, @Param('id') id: string){
    const result =  await this.Service.findTestById(id);
    if(result){
      res.status(200).json({status:true, message:`1 record found.`, result:result}).send();
    }else{
      res.status(200).json({status:false, message:'Record not found.'}).send();
    }
  }

  @Post('tests')
  async post(@Res() res: Response, @Body() createTestDto: createTestDto){ 
    const result = await this.Service.addTest(createTestDto);
    if(result){
      res.status(200).json({status:true, message:'Test has been added.', result:result}).send();
    }else{
      res.status(501).json({status:false, message:'Something went wrong. Please try again.'}).send();
    }
  }
 
}
