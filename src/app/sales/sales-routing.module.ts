import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnComponent } from '../return/components/return/return.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductSalesFormComponent } from './components/product-sales-form/product-sales-form.component';
import { ProductSalesListComponent } from './components/product-sales-list/product-sales-list.component';


const routes: Routes = [
  { path: '', component: SalesComponent },
  {path:'salesForm',component:ProductSalesFormComponent},
  {path:'salesList',component:ProductSalesListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
