import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AddUsersComponent } from './components/add-users/add-users.component';

const routes: Routes = [
  {path:'',component:UsersComponent},
  {path:'addusers',component:AddUsersComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
