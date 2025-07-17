import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/Service/users.service';
import { SharedService } from '../../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Iusers } from 'src/app/Models/iusers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  allUsers: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private sharedService: SharedService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.initializeUserForm();
    this.getUsers();
  }
  initializeUserForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password: ['', Validators.required],
    });
  }
  getUsers() {
    this.userService.getAllUsers().subscribe((res: Iusers[]) => {
      this.allUsers = res;
      console.log(this.allUsers);
    });
  }

  submitUser() {
    let index = this.allUsers.findIndex((item) => 
      item.username ==this.loginForm.value.username && 
      item.password == this.loginForm.value.password
     
    );
    if (index == -1) {
      this.toaster.error('Username or Password invalid');
    } else {
      const userName = this.loginForm.value.username;
      this.sharedService.setUserName(userName);
      this.toaster.success('Logged in successfully');
      this.router.navigate(['/users']);
    }
  }
}
