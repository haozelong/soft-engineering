import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BasicModule} from "@yunzhi/ng-theme";
import {ThemeService} from "../service/theme.service";
import {AppRoutingModule} from "./app-routing.module";
import {YzPageModule, YzUploaderModule} from "@yunzhi/ng-common";
import {NgxSpinnerModule} from "ngx-spinner";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ApiProModule} from "../api/api.pro.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    BasicModule.forRoot({
      basicService: ThemeService
    }),
    AppRoutingModule,
    YzPageModule,
    YzUploaderModule,
    NgxSpinnerModule,
    NoopAnimationsModule,
    // 仅前台模式
    //ApiDemoModule,
    // 前后台模式
    ApiProModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
