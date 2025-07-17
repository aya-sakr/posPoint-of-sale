import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddEditItemsComponent } from './components/add-edit-items/add-edit-items.component';


const routes: Routes = [
  { path: '', component: ItemsListComponent },
  {path:'additems', component:AddEditItemsComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
