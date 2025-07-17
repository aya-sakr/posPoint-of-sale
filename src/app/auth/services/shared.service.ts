import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userNameSubject = new BehaviorSubject<any>(this.getStoredUsername())

  constructor() { }
  setUserName(name:string){
    localStorage.setItem('userName',name)
    return this.userNameSubject.next(name)
  }

  getUserName(){
    return this.userNameSubject.asObservable()
  }
 getStoredUsername(){
    return localStorage.getItem ('userName')
  }

 
}
