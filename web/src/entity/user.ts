import {UserStatus} from './enum/user-status';
import {Role} from './role';

/**
 * 用户
 */
export class User {
  /**
   * 描述
   */
  describe: string;
  /** id */
  id: number;
  /**
   * 姓名
   */
  name: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 角色
   */
  roles: Array<Role>;
  /**
   * 状态
   */
  status: UserStatus;
  /**
   * 用户名(手机号）
   */
  username: string;

  constructor(data = {} as {
    id?: number,
    password?: string,
    name?: string,
    num?: string,
    roles?: Role[],
    status?: UserStatus,
    username?: string,
  }) {
    this.id = data.id;
    this.password = data.password;
    this.username = data.username;
    if (Array.isArray(data.roles)) {
      this.roles = [];
      data.roles.forEach(role => {
        if (role instanceof Role) {
          this.roles.push(role);
        } else {
          this.roles.push(new Role(role));
        }
      });
    }
    this.status = data.status;
    this.name = data.name;
  }
}
