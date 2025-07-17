import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '', component: LayoutComponent,children: [
    
      
        {path: 'users', loadChildren: () =>import('./users/users.module').then((m) => m.UsersModule)},
        {path: 'items', loadChildren: () =>import('./items/items.module').then((m) => m.ItemsModule)},
        {path: 'orders', loadChildren: () =>import('./orders/orders.module').then((m) => m.OrdersModule)},
        {path: 'reports', loadChildren: () =>import('./reports/reports.module').then((m) => m.ReportsModule)},
        {path: 'return', loadChildren: () =>import('./return/return.module').then((m) => m.ReturnModule)},
        {path: 'sales', loadChildren: () =>import('./sales/sales.module').then((m) => m.SalesModule)},
        {path: 'setting', loadChildren: () =>import('./setting/setting.module').then((m) => m.SettingModule)},
        {path: 'profile', loadChildren: () =>import('./profile/profile.module').then((m) => m.ProfileModule)},
         {path: 'logout', loadChildren: () =>import('./logout/logout.module').then((m) => m.LogoutModule)},
        



   
        { path: '', redirectTo: '/users', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
