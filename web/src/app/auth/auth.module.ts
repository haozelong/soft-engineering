import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import { VerificationCodeComponent } from './verification-code/verification-code.component';


@NgModule({
  declarations: [
    AuthComponent,
    ResetPasswordComponent,
    LoginComponent,
    VerificationCodeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
