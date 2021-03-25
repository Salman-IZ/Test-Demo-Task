import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from './questions/module'; 
import { TestModule } from './tests/module'; 
import { ResultsModule } from './results/module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/test_task'), QuestionsModule, TestModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
