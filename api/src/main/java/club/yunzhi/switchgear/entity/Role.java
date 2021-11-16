package club.yunzhi.switchgear.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

/**
 * 角色.
 */
@Entity
public class Role {
  /**
   * 用户角色.
   */
  public static Long ROLE_ADMIN = 0L;
  public static Long ROLE_USER = 1L;

  @Id
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String value;

  private int weight;

  public Role() {
  }

  public Role(Long id) {
    this.id = id;
  }

  public Role(Long id, String name, String value, int weight) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = weight;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public int getWeight() {
    return weight;
  }

  public void setWeight(int weight) {
    this.weight = weight;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Role role = (Role) o;
    return Objects.equals(id, role.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
