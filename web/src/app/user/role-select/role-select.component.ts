import { Component, forwardRef, OnInit } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {USER_ROLE} from '../../../entity/enum/user-role';
import {UserService} from '../../../service/user.service';
import {Assert} from '@yunzhi/utils';

/**
 * 用户角色选择组件
 */
@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return RoleSelectComponent;
      })
    }
  ]
})
export class RoleSelectComponent implements OnInit, ControlValueAccessor{
  formControl = new FormControl()
  roles = [] as {id: number,name: string}[];
  constructor(private userService: UserService ) { }

  ngOnInit(): void {
    const enums = Object.entries(USER_ROLE);
    let roles = [];
    let currentUserRoleWeight;
    this.userService.currentLoginUser$
      .subscribe(user => {
        if(user !== null){
          currentUserRoleWeight = user.role.weight;
          enums.forEach(function (role){
            if(role[1].value<=currentUserRoleWeight)
              roles.push({
                id: role[1].value,
                value: role[1].description
              });
          })
          this.roles = roles;
        }

      })
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges
      .subscribe(data => fn(data))
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: number): void {
    Assert.isNumber(obj,'传入number');
    this.formControl.setValue(obj)
  }

}
