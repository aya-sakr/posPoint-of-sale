import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRoutingModule } from './return-routing.module';
import { ReturnComponent } from './components/return/return.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ReturnComponent
  ],
  imports: [
    CommonModule,
    ReturnRoutingModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    FormsModule,
    TableModule

  ]
})
export class ReturnModule { }
