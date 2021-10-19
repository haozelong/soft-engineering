import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@yunzhi/ng-common";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthComponent} from "../auth.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [
    {
      provide: AuthComponent, multi: true,
      useClass: AuthComponent
    }
  ]
})
export class ResetPasswordComponent implements OnInit {

  formGroup = new FormGroup({});
  keys = {
    phone: 'phone',
    verificationCode: 'verificationCode'
  }

  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authComponent: AuthComponent
              ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.phone, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.verificationCode, new FormControl('', Validators.required));
  }

  onSubmit(): void {
    this.userService.resetPasswordByUsernameAndCode(
      {
        username: this.formGroup.get(this.keys.phone).value.toString(),
        verificationCode: this.formGroup.get(this.keys.verificationCode).value.toString()
      })
      .subscribe(param => {
        if (param !== null) {
          this.commonService.success(() => {}, '', '密码重置为' + param);
          this.authComponent.mode = 'login';
          this.authComponent.ngOnInit();
          this.router.navigateByUrl('/login');
        } else {
          this.commonService.error(() => {}, '', '验证码错误')
        }
      });
  }

  onVerification() {
    this.userService.isRequireValidationCode(this.formGroup.get(this.keys.phone).value);
    this.userService.sendVerificationCode(this.formGroup.get(this.keys.phone).value)
      .subscribe(() => {
      }, (response: HttpErrorResponse) => {
        console.log(response);
      });
    this.commonService.success(() => {
    }, '', '验证码已发送');
  }
}
