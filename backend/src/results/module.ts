import { Module } from '@nestjs/common';
import { ResultsController } from './controller';
import { Service } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Results, ResultsSchema } from './schema';

@Module({ 
  imports: [MongooseModule.forFeatureAsync([{
    name:Results.name,
    useFactory: () => {
      const schema = ResultsSchema;
      schema.plugin(require('mongoose-autopopulate'));
      return schema;
    }
  }])],
  controllers: [ResultsController],
  providers: [Service],
})
export class ResultsModule {}
