import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {RoleSelectModule} from '../role-select/role-select.module';



@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    RoleSelectModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
