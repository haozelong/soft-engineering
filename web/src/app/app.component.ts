import { Component } from '@angular/core';
import {of, Subscription} from 'rxjs';
import {delay} from "rxjs/operators";
import {randomNumber} from "@yunzhi/utils";
import {LoadingInterceptor} from "../interceptor/loading.interceptor";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfigService} from "../service/config.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../entity/user";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.title;
  user = null as User;
  loading = 0;
  spinnerTypes = ['ball-fussion', 'ball-clip-rotate-multiple',
    'ball-spin-clockwise', 'cog', 'square-jelly-box', 'timer'];
  spinnerType: string;
  private showLoadingSubscription = null as Subscription;
  private hideLoadingSubscription = null as Subscription;
  private showLoading = false;

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private configService: ConfigService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.configService.checkVersion();
    this.userService.currentLoginUser$.subscribe(user => {
      if (user !== this.user) {
        this.user = user;
        if ((user === null || typeof user === 'undefined') && !this.router.url.startsWith('/login')) {
          this.router.navigateByUrl('/login').then();
        }
      }
    });
    this.generateSpinnerType();
    LoadingInterceptor.loading$.subscribe(loading => {
      this.setLoading(loading);
    });
  }

  setLoading(loading: boolean): void {
    if (loading) {
      this.loading++;
    } else if (this.loading > 0) {
      this.loading--;
    }

    if (this.loading === 1 && loading) {
      console.log('show loading');
      if (this.hideLoadingSubscription) {
        this.hideLoadingSubscription.unsubscribe();
        this.hideLoadingSubscription = null;
      } else {
        this.showLoadingSubscription = of({}).pipe(delay(500)).subscribe(
          () => {
            this.showLoading = true;
            this.spinner.show().then();
            this.showLoadingSubscription = null;
          });
      }
    } else if (this.loading === 0) {
      if (this.showLoadingSubscription) {
        this.showLoadingSubscription.unsubscribe();
        this.showLoadingSubscription = null;
      } else {
        // 100MS后再选择隐藏，防止前台接连请求时loading频闪的问题
        this.hideLoadingSubscription = of({}).pipe(delay(100))
          .subscribe(() => {
            this.showLoading = false;
            this.hideLoadingSubscription = null;
            this.spinner.hide().then();
          });
      }
    }
  }

  generateSpinnerType() {
    this.spinnerType = this.spinnerTypes[randomNumber() % this.spinnerTypes.length];
  }
}
