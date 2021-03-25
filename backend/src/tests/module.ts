import { Module } from '@nestjs/common';
import { TestController } from './controller';
import { Service } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './schema';

@Module({ 
  imports: [MongooseModule.forFeatureAsync([{
    name:Test.name,
    useFactory: () => {
      const schema = TestSchema;
      schema.plugin(require('mongoose-autopopulate'));
      return schema;
    }
  }])],
  controllers: [TestController],
  providers: [Service],
})
export class TestModule {}
