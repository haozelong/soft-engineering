import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleSelectModule} from '../role-select/role-select.module';



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleSelectModule,
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
