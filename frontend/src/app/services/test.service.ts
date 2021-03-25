import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTestResults(): Observable<any> {
    return this.http.get<any>(`${environment.backendRoute}results`);
  }

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(`${environment.backendRoute}questions`);
  }

  createTest(requestData:any): Observable<any> {
    return this.http.post<any>(`${environment.backendRoute}tests` , requestData);
  }

  getAllTests(): Observable<any> {
    return this.http.get<any>(`${environment.backendRoute}tests`);
  }

  getTestDetail(id:any): Observable<any> {
    return this.http.get<any>(`${environment.backendRoute}tests/${id}`);
  }

  submitTest(requestData:any): Observable<any> {
    return this.http.post<any>(`${environment.backendRoute}results` , requestData);
  }

}
