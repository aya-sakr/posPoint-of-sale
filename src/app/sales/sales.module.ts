import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {MatTableModule} from '@angular/material/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './components/sales/sales.component';
import { ProductSalesFormComponent } from './components/product-sales-form/product-sales-form.component';
import { ProductSalesListComponent } from './components/product-sales-list/product-sales-list.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    SalesComponent,
    
    ProductSalesFormComponent,

    ProductSalesListComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatTableModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    AutoCompleteModule,
    HttpClientModule,
    DropdownModule,
    ToastrModule


  
   
  ]
})
export class SalesModule { }
