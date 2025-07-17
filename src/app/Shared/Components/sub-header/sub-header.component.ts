import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Items } from 'src/app/Models/items';

@Component({
  selector: 'app-sub-header',
  standalone:true,
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  imports:[CommonModule]
})
export class SubHeaderComponent {
  @Input() title: string = '' 
  @Input() add: string = ''
  @Output() addItemButton = new EventEmitter<Items>()
  

  addNewItem() {
    this.addItemButton.emit ()
  
}
}
