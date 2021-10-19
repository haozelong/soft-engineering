import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {Menu} from '@yunzhi/ng-common';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [
    {
      name: '首页',
      url: 'dashboard',
      icon: 'fa fa-tachometer-alt',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '党建管理',
      url: 'party-building',
      icon: 'fa fa-handshake',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '居民管理',
      url: 'resident',
      icon: 'fa fa-user-cog',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '住房管理',
      url: 'house',
      icon: 'fa fa-laptop-house',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '楼栋/片区管理',
      url: 'building',
      icon: 'fa fa-house-user',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '小区管理',
      url: 'village',
      icon: 'fa fa-building',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '社区管理',
      url: 'community',
      icon: 'fa fa-city',
      roles: [{key: 'admin'}]
    },
    {
      name: '乡镇管理',
      url: 'town',
      icon: 'fa fa-home',
      roles: [{key: 'admin'}]
    },
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-lock',
      roles: [{key: 'admin'}]
    },
    {
      name: '系统设置',
      url: 'system',
      icon: 'fa fa-plus-square',
      roles: [{key: 'admin'}],
      children: [
        {
          name: '居民间关系',
          url: 'relationship',
          icon: 'fa fa-user-friends',
          roles: [{key: 'admin'}]
        },
        {
          name: '角色管理',
          url: 'role',
          icon: 'fa fa-user-friends',
          roles: [{key: 'admin'}]
        },
        {
          name: '岗位管理',
          url: 'post',
          icon: 'fa fa-user-friends',
          roles: [{key: 'admin'}]
        }
      ]
    },
    {
      name: '个人中心',
      url: 'personal-center',
      icon: 'fa fa-user-alt',
      roles: [{key: 'user'}, {key: 'admin'}]
    },
    {
      name: '社区3D管理',
      url: 'community-3d',
      icon: 'fas fa-cubes',
      roles: [{key: 'admin'}]
    },
    {
      name: '网格员管理',
      url: 'grider',
      icon: 'fa fa-users-cog',
      roles: [{key: 'admin'}]
    },
    {
      name: '活动管理',
      url: 'activity',
      icon: 'fas fa-people-arrows',
      roles: [{key: 'admin'}]
    },
    {
      name: '物业管理',
      url: 'property',
      icon: 'fa fa-gopuram',
      roles: [{key: 'admin'}]
    },
    {
      name: '车辆管理',
      url: 'vehicle',
      icon: 'fas fa-car-side',
      roles: [{key: 'admin'}]
    },
    {
      name: '报修管理',
      url: 'repair',
      icon: 'fas fa-tools',
      roles: [{key: 'admin'}]
    }
  ] as Menu[];

  constructor(private userService: UserService) {
  }

  public getMenus(): Observable<Menu[]> {
    let subscribe: Subscriber<Menu[]>;
    return new Observable<Menu[]>(s => {
      subscribe = s;
      this.userService.currentLoginUser$.subscribe(
        user => {
          const roleKeys = user ? user.roles.map(role => role.value) : [];
          subscribe.next(
            MenuService.menus.filter(menu => {
              const menuRoleKeys = menu.roles.map(role => role.key);
              let found = false;
              menuRoleKeys.forEach(roleKey => {
                if (!found && (roleKeys.indexOf(roleKey) !== -1)) {
                  found = true;
                }
              });
              return found;
            })
          );
        }
      );
    });
  }
}
