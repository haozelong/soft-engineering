import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent {

  _phone: string;

  /**正在倒计时*/
  countDowning = false;

  countDown = 0;

  /** 验证码按钮提示信息*/
  validateCodeInfo = '发送验证码'

  @Input()
  set phone(phone: string) {
    this._phone = phone;
  }

  get phone(): string {
    return this._phone;
  }

  @Output()
  beError = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  /**
   * 发送验证码
   */
  sendVerificationCode(): void {
    this.countDowning = true;

    // 初始化计数
    this.countDown = 60;

    //修改提示信息
    this.validateCodeInfo = this.countDown + '秒后重新获取';

    //定时器，间隔1s
    const handler = setInterval(() => {
      // 自减
      this.countDown--;
      this.validateCodeInfo = this.countDown + '秒后重新获取';

      // 如果减为0，重新启用按钮
      if (this.countDown === 0) {
        this.countDowning = false;
        this.validateCodeInfo = '获取验证码';

        // 清空定时器
        clearInterval(handler);
      }
    }, 1000, 60);

    this.userService.sendVerificationCode(this._phone)
      .subscribe(() => {
      }, (response: HttpErrorResponse) => {
        console.log(response);
        this.beError.emit(response.error.message);
      });
  }

  verificationCodeButtonDisabled(): boolean {
    return this.countDown > 0;
  }
}
