package club.yunzhi.switchgear.startup;

import club.yunzhi.switchgear.entity.Role;
import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.properties.AppProperties;
import club.yunzhi.switchgear.repository.RoleRepository;
import club.yunzhi.switchgear.repository.UserRepository;
import com.mengyunzhi.core.exception.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;


/**
 * 初始化测试账户
 * admin / admin
 */
@Component
public class InitUser implements ApplicationListener<ContextRefreshedEvent>, Ordered {

  private static final Logger logger = LoggerFactory.getLogger(club.yunzhi.switchgear.startup.InitUser.class);

  private final AppProperties appProperties;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;

  public InitUser(AppProperties appProperties, UserRepository userRepository,
                  RoleRepository roleRepository) {
    this.appProperties = appProperties;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    Role adminRole;
    logger.info("初始化角色及系统管理员");
    if (this.roleRepository.count() > 0) {
      adminRole = this.roleRepository.findById(Role.ROLE_ADMIN).orElseThrow(() -> new ValidationException("未获取到系统管理员角色"));
    } else {
      adminRole = this.roleRepository.save(new Role(Role.ROLE_ADMIN, "系统管理员", "ROLE_ADMIN", 0));
      this.roleRepository.save(new Role(Role.ROLE_USER, "普通用户", "ROLE_MANAGER", 1));
    }

    logger.info("初始化用户");
    if (userRepository.count() == 0) {
      User user = new User();
      user.setName(this.appProperties.getName());
      user.setUsername(this.appProperties.getUsername());
      user.setPassword(this.appProperties.getPassword());
      user.setRole(adminRole);
      userRepository.save(user);
    }
  }

  @Override
  public int getOrder() {
    return Integer.MIN_VALUE;
  }
}
