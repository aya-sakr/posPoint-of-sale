import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUsersComponent } from './components/add-users/add-users.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';















@NgModule({
  declarations: [
    UsersComponent,
    AddUsersComponent,
    
   

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    TableModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {timeOut:3000}
    )


 


   

  ],
 
})
export class UsersModule { }
