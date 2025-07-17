import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Items } from 'src/app/Models/items';

@Injectable({
  providedIn: 'root'
})
export class SharedItemsService {
  private newItemSubject = new BehaviorSubject<Items[]|string| null >(null)

constructor() { }
  
setNewItem(item:Items[]){
  return this.newItemSubject.next(item)
}
  getNewItem() {
    return this.newItemSubject.asObservable()
  }

  setEditId(id:string) {
    return this.newItemSubject.next(id)
  }
  getEditId() {
    return this.newItemSubject.asObservable()
  }
}
