import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';
import { SharedUserService } from '../../Service/shared-user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
   @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource:any;  
    displayedColumns: string[] = ['index', 'username', 'password','action'];


  

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
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe((users: Iusers[]) => {
       this.dataSource = new MatTableDataSource(users);
       this.dataSource.paginator = this.paginator;
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
  deleteUser(userId: any) {
      this.usersService.deletUser(userId).subscribe(() => {
      this.toaster.success('The product deleted ', 'success');
      this.getUsers()
    });

  
  }
}
