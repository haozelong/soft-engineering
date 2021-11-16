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
  role: Role;
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
    role?: Role,
    status?: UserStatus,
    username?: string,
  }) {
    this.id = data.id;
    this.password = data.password;
    this.username = data.username;
    this.role = data.role;
    this.status = data.status;
    this.name = data.name;
  }
}
