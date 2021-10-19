import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../service/config.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit, OnInit {
  @ViewChild('login')
  loginElementRef: ElementRef;
  loginHtmlElement: HTMLElement;
  @ViewChild('main')
  mainElementRef: ElementRef;
  mainHtmlElement: HTMLElement;
  /** 当前模式 */
  mode = 'login';
  version = '';
  year = new Date().getFullYear();

  constructor(private configService: ConfigService) {
  }

  ngAfterViewInit(): void {
    this.mainHtmlElement = this.mainElementRef.nativeElement as HTMLElement;
    this.loginHtmlElement = this.loginElementRef.nativeElement as HTMLElement;
    this.resetHeight();
    window.onresize = () => {
      this.resetHeight();
    };
  }

  ngOnInit(): void {
    this.version = this.configService.config.version;
  }

  onChangeToLogin(): void {
    this.mode = 'login';
  }

  onChangeToResetPassword(): void {
    this.mode = 'resetPassword';
  }

  onReSetPasswordDone(): void {
    // this.mode = 'login';
  }

  resetHeight() {
    const height = window.innerHeight > 640 ? window.innerHeight : 640;
    this.mainHtmlElement.style.height = height + 'px';

    const top = (height - this.loginHtmlElement.offsetHeight) / 2;
    this.loginHtmlElement.style.top = top + 'px';
  }

}
