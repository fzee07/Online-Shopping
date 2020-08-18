import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {RegisterComponent} from '../../components/register/register.component';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {TableComponent} from '../../components/table/table.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    MatCardModule
  ],
  exports:[
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    PaginationComponent,
    TableComponent,
    RegisterComponent,
    FormsModule,
    ModalComponent
  ],
  declarations: [ModalComponent,PaginationComponent,TableComponent,RegisterComponent
  ]
})
export class SharedModule { }
