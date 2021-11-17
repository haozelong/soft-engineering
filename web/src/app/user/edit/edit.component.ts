import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {User} from '../../../entity/user';
import {Role} from '../../../entity/role';
import {DISTRICT_TYPE} from '../../../entity/enum/district-type';
import {USER_ROLE} from '../../../entity/enum/user-role';

/**
 * 用户管理编辑
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  districtCommunityType = DISTRICT_TYPE.community.value;
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    role: 'role',
  };
  user = new User;
  roles = [] as {id: number, name: string}[];

  constructor(private commonService: CommonService,
              public userService: UserService,
              private route: ActivatedRoute) {
  }

  loadById(id: number): void {
    this.userService.getById(id)
      .subscribe((user: User) => {
        this.setUser(user);
      }, error => {
        throw new Error(error);
      })
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = +param.id;
      this.user.id = id;
      Assert.isTrue(Number.isInteger(id), 'ID类型不正确');
      this.loadById(id);
    })
  }

  onSubmit(formGroup: FormGroup) {
    this.userService.update(this.user.id, {
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      role: {id: formGroup.get(this.formKeys.role).value as number} as Role,
    }).subscribe(() => {
      },
      () => {
      },
      () => {
        this.commonService.success(() => {
          this.commonService.back()
        });
      });
  }

  setUser(user: User): void {
    console.log(user);
    this.user = user;
    Assert.isDefined(user, self.name + ' user must be defined');
    Assert.isDefined(user.name, user.username, self.name + ' user validate fail');
    this.formGroup.get(this.formKeys.name).setValue(user.name);
    this.formGroup.get(this.formKeys.username).setValue(user.username);
    this.formGroup.get(this.formKeys.role).setValue(user.role.id);
  }
}
