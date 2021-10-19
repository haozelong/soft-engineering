import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzStatusSelectComponent} from './yz-status-select.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 状态相关模块
 * 解决多状态时定制格式输出的问题
 */
@NgModule({
  declarations: [
    YzStatusSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    YzStatusSelectComponent
  ]
})
export class YzStatusModule {
}
