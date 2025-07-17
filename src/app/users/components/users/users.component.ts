import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';
import { SharedUserService } from '../../Service/shared-user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  allUsers: Iusers[] = [];
  constructor(
    private userSharedService: SharedUserService,
    private usersService: UsersService,
    private toaster: ToastrService,
    private dialog: MatDialog,
  
  ) {}
  ngOnInit() {
    this.getUsers();

    this.userSharedService.getNewUser().subscribe((res: any) => {
      if (res) {
        this.allUsers.push(res);
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe((data: Iusers[]) => {
      this.allUsers = data;
    });
  }
  addNewUser() {
    this.dialog.open(AddUsersComponent, {
      disableClose: true,
      autoFocus: false,
      data: { id: '' },
    });
  }
  editUser(userEditedId: string) {
    this.dialog
      .open(AddUsersComponent, {
        disableClose: true,
        autoFocus: false,
        data: { id: userEditedId },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUsers();
      });
  }
  deletUser(userId: any, userIndex: any) {
    this.allUsers.splice(userIndex, 1);
    this.usersService.deletUser(userId).subscribe(() => {
      this.toaster.success('The product deleted ', 'success');
    });

  
  }
}
