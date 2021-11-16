
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
  }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.value = data.value;
      this.weight = data.weight;
    }
  }
}
