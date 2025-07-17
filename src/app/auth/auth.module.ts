import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgetComponent } from './Components/forget/forget.component';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext'


@NgModule({
  declarations: [
    LoginComponent,
    ForgetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
     RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule   ,
    InputTextModule
  ]
})
export class AuthModule {

 }
