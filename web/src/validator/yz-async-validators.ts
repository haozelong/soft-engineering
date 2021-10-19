import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, delay, map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from "../service/user.service";

/**
 * 异步验证器.
 */
@Injectable({
  providedIn: 'root'
})
export class YzAsyncValidators {

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  /**
   * 验证方法，手机号
   * @param user
   */
  usernameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {  //控制表单输入的username，用来验证是否已经存在
      if (control.value === '') {
        return of(null);
      }
      return this.userService.existByUsername(control.value).pipe(map(exists => exists ? {usernameExist: true} : null));
    };
  };
}
