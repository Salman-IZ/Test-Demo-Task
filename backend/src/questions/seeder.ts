import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Questions, QuestionsDocument } from "./schema";
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class QuestionsSeeder implements Seeder {
  constructor(@InjectModel(Questions.name) private readonly model: Model<QuestionsDocument>) {}

  async seed(): Promise<any> { 

    // Insert into the database.
    return this.model.insertMany([
        {
            title: 'what is the current year?',
            answer: '3',
            serial_no:1,
            options: [
                '2018',
                '2019',
                '2020',
                '2021'
            ] 
        },
        {
            title: 'Which is the first month of year?',
            answer: '1',
            serial_no:2,
            options: [
                'February',
                'January',
                'July',
                'March'
            ] 
        },
        {
            title: 'Which is the last month of year?',
            answer: '3',
            serial_no:3,
            options: [
                'February',
                'January',
                'July',
                'December'
            ] 
        },
        {
            title: 'Which is the second month in year?',
            answer: '0',
            serial_no:4,
            options: [
                'February',
                'January',
                'July',
                'December'
            ] 
        },
        {
            title: 'What is the next year?',
            answer: '3',
            serial_no:5,
            options: [
                '2018',
                '2019',
                '2021',
                '2022'
            ] 
        },
        {
            title: 'What is the previous year?',
            answer: '1',
            serial_no:6,
            options: [
                '2019',
                '2020',
                '2021',
                '2022'
            ]
        },
        {
            title: 'Which is the leap year?',
            answer: '1',
            serial_no:7,
            options: [
                '2015',
                '2016',
                '2017',
                '2018'
            ]
        },
        {
            title: 'Which is not the leap year?',
            answer: '0',
            serial_no:8,
            options: [
                '2015',
                '2016',
                '2020',
                '2024'
            ] 
        }
    ]);
  }

  async drop(): Promise<any> {
    return this.model.deleteMany({});
  }
}