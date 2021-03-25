import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  closeResult = '';
  createTestForm: any;
  modalReference:any;
  totalTests:any;

  questions:any;

  testsData:any;
  
  constructor(private modalService: NgbModal , private fb: FormBuilder , private _testService: TestService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.setTestForm();

    this._testService.getAllTests()
    .subscribe(
      data => {
        this.totalTests = data.result;
      },
      err => {
       this.toastr.error('Something went wrong', 'Failed');
      }
  );

    this._testService.getAllTestResults()
          .subscribe(
            data => {
              this.testsData = data.result;
              this.testsData =  this.testsData.reverse();
            },
            err => {
             this.toastr.error('Something went wrong', 'Failed');
            }
        );

        this._testService.getAllQuestions()
        .subscribe(
          data => {
            this.questions = data.result;
          },
          err => {
           this.toastr.error('Something went wrong', 'Failed');
          }
      );

  }

  setTestForm(): void {
    this.createTestForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      1: [false, [Validators.required]],
      2: [false, [Validators.required]],
      3: [false, [Validators.required]],
      4: [false, [Validators.required]],
      5: [false, [Validators.required]],
      6: [false, [Validators.required]],
      7: [false, [Validators.required]],
      8: [false, [Validators.required]],
    });
  }

  open(content:any) {
    this.modalReference = this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title' , size: 'lg'});
    this.modalReference.result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  submitTestForm(){
    const formData = this.createTestForm.value;

    const checkQuestionCount = Object.values(formData).reduce((a:any, item:any) => a + (item === true ? 1 : 0), 0);

    if(formData.title == ''){
      alert('please add test title');
      return false;
    }
    if(formData.description == ''){
      alert('please add test description');
      return false;
    }
    if(checkQuestionCount != 4){
      alert('please select 4 questions');
      return false;
    }

    let keys = Object.keys(formData);
    let filteredData = keys.filter(function(key) {
      return formData[key] == true
    });

    let questionaIds = [];
    questionaIds[0] = this.questions.find((item:any) => item.serial_no == parseInt(filteredData[0]))?._id;
    questionaIds[1] = this.questions.find((item:any) => item.serial_no == parseInt(filteredData[1]))?._id;
    questionaIds[2] = this.questions.find((item:any) => item.serial_no == parseInt(filteredData[2]))?._id;
    questionaIds[3] = this.questions.find((item:any) => item.serial_no == parseInt(filteredData[3]))?._id;

    const requestData = 
      {
        title: formData.title,
        description: formData.description,
        questions: questionaIds
      }

    this._testService.createTest(requestData)
          .subscribe(
            data => {
              this.toastr.success('Test Created Successfully!' , 'Submitted');
            },
            err => {
             this.toastr.error('Invalid Data', 'Failed');
            }
        );

        this.modalReference.close();

    return true;

  }

}
