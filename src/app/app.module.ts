import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { OrdersModule } from './orders/orders.module';
import { SettingModule } from './setting/setting.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ReturnModule } from './return/return.module';
import { SalesModule } from './sales/sales.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';








@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
   
   
   

    

 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UsersModule,
    SalesModule,
    OrdersModule,
    SettingModule,
    ItemsModule,
    ReportsModule,
    ReturnModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    
      

  ],

  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
