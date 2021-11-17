import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectComponent } from './role-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    RoleSelectComponent
  ],
  exports: [
    RoleSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class RoleSelectModule { }
