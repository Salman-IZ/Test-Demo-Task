import { Module } from '@nestjs/common';
import { QuestionsController } from './controller';
import { Service } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name:Questions.name,
    useFactory: () => {
      const schema = QuestionsSchema;
      schema.plugin(require('mongoose-autopopulate'));
      return schema;
    }
  }])],
  controllers: [QuestionsController], 
  providers: [Service],
})
export class QuestionsModule {}
