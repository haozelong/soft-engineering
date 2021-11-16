package club.yunzhi.switchgear.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

/**
 * @author haozelong
 * @ panjie 2021-08-20
 * <p>
 * 规范化jsonview，增加openid字段
 * </p>
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"username", "deleteAt"}))
@SQLDelete(sql = "update `user` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
@Where(clause = "deleted = false")
public class User extends AbstractEntity {
  @Column(nullable = false)
  @JsonView(UsernameJsonView.class)
  private String username;

  /**
   * 密码加密
   */
  private static PasswordEncoder passwordEncoder;

  @JsonView(PasswordJsonView.class)
  private String password;

  @Column(nullable = false)
  @JsonView(NameJsonView.class)
  private String name;

  /**
   * 用户的角色
   */
  @OneToOne
  @JsonView(RoleJsonView.class)
  private Role role = new Role();

  @JsonView(DeleteAtJsonView.class)
  protected Long deleteAt;

  @JsonView(DeletedJsonView.class)
  private Boolean deleted = false;

  public static void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    User.passwordEncoder = passwordEncoder;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    if (User.passwordEncoder == null) {
      throw new RuntimeException("未设置User实体的passwordEncoder，请调用set方法设置");
    }
    this.password = User.passwordEncoder.encode(password);
  }

  /**
   * 判断用户是否被锁定.
   *
   * @return 锁定   false ;未锁定  true.
   */
  public boolean isNonLocked() {
    return true;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public Boolean getDeleted() {
    return deleted;
  }

  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }

  public interface UsernameJsonView {
  }

  public interface NameJsonView {
  }

  private class PasswordJsonView {
  }

  public interface RoleJsonView {
  }

  public interface DeleteAtJsonView {
  }

  public interface DeletedJsonView {
  }
}
