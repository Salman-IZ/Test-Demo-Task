import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { Questions, QuestionsSchema } from "./questions/schema";
import { QuestionsSeeder } from "./questions/seeder";

seeder({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/test_task"),
    MongooseModule.forFeature([{ name: Questions.name, schema: QuestionsSchema }]),
  ],
}).run([QuestionsSeeder]);