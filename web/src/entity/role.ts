
/**
 * 角色.
 */
export class Role {
  /**
   * id
   */
  id: number;

  /**
   * 名称
   */
  name: string;
  /**
   * 是否系统内置角色
   */
  systemed: boolean;
  value: string;
  /**
   * 权重
   */
  weight: number;

  constructor(data = {} as {
    id?: number,
    name?: string,
    value?: string,
    weight?: number,
    systemed?: boolean,
  }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.value = data.value;
      this.weight = data.weight;
      this.systemed = data.systemed;
    }
  }
}
