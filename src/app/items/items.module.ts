import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddEditItemsComponent } from './components/add-edit-items/add-edit-items.component';
import { SubHeaderComponent } from "../Shared/Components/sub-header/sub-header.component";
import {  MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
 
    ItemsListComponent,
    AddEditItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    SubHeaderComponent,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
   
]
})
export class ItemsModule { }
