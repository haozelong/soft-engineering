package club.yunzhi.switchgear.repository;

import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.repository.specs.UserSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor {

  default Page getAll(String name, String username, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<User> specification = UserSpecs.containingName(name)
        .and(UserSpecs.equalUsername(username));
    return this.findAll(specification, pageable);
  }

  /**
   * 根据用户名查询用户
   */
  Optional<User> findByUsername(String username);
}
