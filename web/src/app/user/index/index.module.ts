import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

/**
 * 用户首页
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzPageModule,
    YzSizeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [IndexComponent]
})
export class IndexModule { }
