import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
import {Role} from '../../../entity/role';
import {YzAsyncValidators} from '../../../validator/yz-async-validators';

/**
 * 用户管理新增
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  /**
   * 新增用户数据项
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    role: 'role',
  };

  constructor(private commonService: CommonService,
              private userService: UserService,
              private yzAsyncValidators: YzAsyncValidators) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name,
      new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username,
      new FormControl('', Validators.required,this.yzAsyncValidators.usernameNotExist()));
    this.formGroup.addControl(this.formKeys.role,
      new FormControl('', Validators.required));
  }

  /**
   * 保存提交功能
   * @param formGroup 待保存的数据
   */
  onSubmit(formGroup: FormGroup): void {
    // 通过formGroup数据构造新用户

    const user = new User({
        name: formGroup.get(this.formKeys.name).value,
        username: formGroup.get(this.formKeys.username).value,
        role: {id: formGroup.get(this.formKeys.role).value as number} as Role
        });
    // 调用M层方法传入新用户对后台进行请求
    this.userService.save(user)
      .subscribe(() => {
        // 数据保存成功，调用commonService的成功提示并进行返回跳转
        this.commonService.success(() => {
          this.commonService.back();
        });
      });
  }
}
