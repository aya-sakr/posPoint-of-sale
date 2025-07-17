import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgetComponent } from './Components/forget/forget.component';


const routes: Routes = [


  {path:'',component:LoginComponent,},
  {path:'forget',component:ForgetComponent,}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
