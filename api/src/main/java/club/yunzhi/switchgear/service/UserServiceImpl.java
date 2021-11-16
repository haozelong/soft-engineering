package club.yunzhi.switchgear.service;

import club.yunzhi.switchgear.entity.Role;
import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.repository.UserRepository;
import club.yunzhi.switchgear.vo.VUser;
import club.yunzhi.switchgear.vo.ValidateMessage;
import com.mengyunzhi.core.exception.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final ValidationCodeService validationCodeService;

  /**
   * 重置后的密码
   */
  private String initialPassword = "yunzhi";

  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ValidationCodeService validationCodeService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.validationCodeService = validationCodeService;
  }

  @Override
  public User findByUsername(String username) {
    return null;
  }

  @Override
  public Optional<User> getCurrentLoginUser() {
    logger.debug("初始化用户");
    Optional<User> user = null;

    logger.debug("获取用户认证信息");
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    logger.debug("根据认证信息查询用户");
    if (authentication != null && authentication.isAuthenticated()) {
      user = userRepository.findByUsername(authentication.getName());
    }

    return user;
  }

  @Override
  public void sendVerificationCode(String phoneNumber) {
    Assert.notNull(phoneNumber, "手机号不能为空");

    logger.debug("验证手机号");
    if (!this.existByUsername(phoneNumber)) {
      throw new IllegalArgumentException("该用户未注册");
    }

    logger.debug("发送验证码");
    this.validationCodeService.sendCode(phoneNumber);
  }

  private boolean existByUsername(String username) {
    return this.userRepository.findByUsername(username) != null;
  }

  @Override
  public boolean checkPasswordIsRight(VUser vUser) {
    logger.debug("获取当前用户");
    Optional<User> user = this.getCurrentLoginUser();

    logger.debug("比较密码是否正确");
    return this.passwordEncoder.matches(vUser.getPassword(), user.get().getPassword());
  }

  @Override
  public void updatePassword(VUser vUser) {
    logger.debug("获取当前用户");
    Optional<User> currentUser = this.getCurrentLoginUser();

    logger.debug("校验原密码是否正确");
    if (!this.checkPasswordIsRight(vUser)) {
      throw new ValidationException("原密码不正确");
    }

    logger.debug("更新密码");
    currentUser.get().setPassword(vUser.getNewPassword());
    this.userRepository.save(currentUser.get());
  }

  @Override
  public String resetPassword(ValidateMessage validateMessage) {
    logger.debug("调用validateService的验证方法");
    String username = validateMessage.getUsername();
    String validateCode = validateMessage.getVerificationCode();
    if (this.validationCodeService.validateCode(username, validateCode)) {
      User user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("实体不存在"));

      logger.debug("设置新密码并保存");
      user.setPassword(initialPassword);
      userRepository.save(user);

      logger.debug("返回设置的新密码");
      String newPassword = initialPassword;
      return newPassword;
    } else {
      throw new ValidationException("输入信息错误，请重新输入");
    }
  }

  @Override
  public Page<User> getAll(String name, String username, Pageable pageable) {
    Assert.notNull(pageable, "Pageable不能为null");
    return this.userRepository.getAll(name, username, pageable);
  }

  @Override
  public User findById(Long id) {
    return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到相关用户"));
  }

  @Override
  public void update(Long id, User user) {
    Assert.notNull(user.getName(), "用户名称不能为空");
    Assert.notNull(user.getUsername(), "用户用户名不能为空");

    User student1 = findById(id);
    student1.setName(user.getName());
    student1.setUsername(user.getUsername());
    userRepository.save(student1);
  }

  @Override
  public void delete(Long id) {
    User user = findById(id);
    // 删除用户
    userRepository.deleteById(user.getId());
  }

  @Override
  public User save(User user) {
    Assert.notNull(user.getName(), "用户名称不能为空");
    Assert.notNull(user.getUsername(), "用户用户名不能为空");
    User newUser = new User();
    newUser.setName(user.getName());
    newUser.setUsername(user.getUsername());
    newUser.setPassword(initialPassword);
    // 设置用户的角色为普通用户
    newUser.setRole(new Role(Role.ROLE_USER));

    return this.userRepository.save(newUser);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("用户不存在"));

    // 设置用户角色
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
  }
}
