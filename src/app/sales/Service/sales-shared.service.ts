import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesSharedService {
  private dataSource = new BehaviorSubject<any[]>([])


  constructor() { }
  sendformData(data: any[]) {
    this.dataSource.next(data)
    
    localStorage.setItem('formData', JSON.stringify(data));
    
  }
  getFormData(): Observable<any[]> {
    return this.dataSource.asObservable()
  }
  
}