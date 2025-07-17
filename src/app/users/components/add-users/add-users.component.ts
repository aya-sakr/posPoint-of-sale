import {
  Component,
  Inject,
  OnInit,

} from '@angular/core';
import {
  FormBuilder,

  FormGroup,
  Validators,
} from '@angular/forms';
import { Iusers } from 'src/app/Models/iusers';
import { UsersService } from '../../Service/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedUserService } from '../../Service/shared-user.service';
import { ToastrService } from 'ngx-toastr';
export interface AddUserDialogData {
  id?: string; // optional if you also use this dialog for “new” users
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  allUsers: Iusers[] = [];
  userForm!: FormGroup;
  postnewUser: Iusers[] = [];
  userId?: any;
  addMode: boolean = true;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dialogRef: MatDialogRef<AddUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData,
    private userSharedService: SharedUserService,
    private toaster:ToastrService
  ) {
    this.userId = data.id;
  }
  ngOnInit(): void {
    this.intiateAddUserForm();

    if (this.userId == '') {
      this.addNewuser();
    } else {
      this.edituser(this.userId);
    }
  }

  intiateAddUserForm() {
    this.userForm = this.fb.group({
      userRole: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password: ['', Validators.required],
    });
  }

  addNewuser() {
    this.addMode = true;
  }
  edituser(userId: string) {
    this.addMode = false;
    this.setFormValue(userId);
  }

  setFormValue(id: string) {
    this.userService.getUserById(id).subscribe((res) => {
      this.userForm.controls['userRole'].setValue(res.userRole);
      this.userForm.controls['username'].setValue(res.username);
      this.userForm.controls['password'].setValue(res.password);
    });
  }
  submitUser() {
    if (this.addMode) {
      this.userService
        .postnewUser(this.userForm.value)
        .subscribe((res: any) => {
          this.userSharedService.setNewUser(res);
          this.toaster.success('User added successfully')
        });
    } else {
    
      this.userService
        .updateUsers(this.userId, this.userForm.value)
        .subscribe((res) => {
          this.dialogRef.close({ action: 'edit', user: res });
          this.toaster.success("The User Updated",'Success')
          
        });
    }
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }
}
