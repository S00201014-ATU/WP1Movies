import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewDataService {
  private formDataSubject =new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  constructor() { }

  updateFormData(formData:any){
    this.formDataSubject.next(formData);
  }
}
