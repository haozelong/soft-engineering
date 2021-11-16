package club.yunzhi.switchgear.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@SQLDelete(sql = "update `system_config` set deleted = 1 where id = ?")
@Where(clause = "deleted = false")
public class SystemConfig extends BaseEntity {
  @Column(unique = true, nullable = false)
  private String keyword;

  private String value = "";

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
