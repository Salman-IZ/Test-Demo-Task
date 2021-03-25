import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {interval, Subscription, timer} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  closeResult = '';
  currentModalData:any = '';
  selectedTest:any = '';
  timer = 0;
  submitTestForm: any;
  timeIntervalSubscription: Subscription;
  modalReference:any;

  testQuestions:any; 
  tests:any;

  constructor(private modalService: NgbModal , private fb: FormBuilder , private _testService: TestService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.setSubmitTestForm();

    this._testService.getAllTests()
    .subscribe(
      data => {
        this.tests = data.result;
      },
      err => {
       this.toastr.error('Something went wrong', 'Failed');
      }
    );
  }

  setSubmitTestForm(): void {
    this.submitTestForm = this.fb.group({
      name: ['', [Validators.required]],
      optionSelection1: ['', [Validators.required]],
      optionSelection2: ['', [Validators.required]],
      optionSelection3: ['', [Validators.required]],
      optionSelection4: ['', [Validators.required]],
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

    this.timeIntervalSubscription.unsubscribe();

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  modalData(data:any){
    this.selectedTest = data;
    const timeInterval = interval(1000);
    this.timeIntervalSubscription =  timeInterval.subscribe(res => {
      this.timer = res;
    })

    this._testService.getTestDetail(this.selectedTest._id)
    .subscribe(
      data => {
        this.testQuestions = data.result.questions;
      },
      err => {
       this.toastr.error('Something went wrong', 'Failed');
      }
   );

  }

  submitTest(){
    let result = 0;
    const formData = this.submitTestForm.value;

    if(formData.name == ''){
      alert('Name is required');
      return false;
    }
    if(!formData.optionSelection1 || !formData.optionSelection2 || !formData.optionSelection3 || !formData.optionSelection4){
      alert('Answers are required');
      return false;
    }

    if(formData.optionSelection1 == this.testQuestions[0].answer){
      result = result + 1
    }
    if(formData.optionSelection2 == this.testQuestions[1].answer){
      result = result + 1
    }
    if(formData.optionSelection3 == this.testQuestions[2].answer){
      result = result + 1
    }
    if(formData.optionSelection4 == this.testQuestions[3].answer){
      result = result + 1
    }

    result = result / 4 * 100;

    const requestData = 
    {
      username: formData.name,
      test: this.selectedTest._id,
      duration: this.timer,
      result: `${result}%`
    }

    this.timeIntervalSubscription.unsubscribe();

    this._testService.submitTest(requestData)
    .subscribe(
      data => {
        console.log(data);
        this.toastr.success('Test Submitted Successfully!' , 'Submitted');
      },
      err => {
       this.toastr.error('Something went wrong', 'Failed');
      }
  );

    this.modalReference.close();
    
    return true;
  }

}
