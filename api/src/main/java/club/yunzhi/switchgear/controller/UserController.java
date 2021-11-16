package club.yunzhi.switchgear.controller;

import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.repository.UserRepository;
import club.yunzhi.switchgear.security.YunzhiSecurityRole;
import club.yunzhi.switchgear.service.UserService;
import club.yunzhi.switchgear.vo.VUser;
import club.yunzhi.switchgear.vo.ValidateMessage;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

/**
 * @author haozelong
 */
@RestController
@RequestMapping("User")
public class UserController {
  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * 获取所有用户
   *
   * @param pageable 分页信息
   * @return 所有用户
   */
  @GetMapping("page")
  @JsonView(PageJsonView.class)
  @Secured(YunzhiSecurityRole.ROLE_ADMIN)
  public Page<User> findAll(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String username,
      @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
          Pageable pageable) {
    return this.userService.getAll(
        name,
        username,
        pageable);
  }


  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public User login(Principal user) {
    User result = new User();
    result.setUsername(user.getName());
    return result;
  }

  @GetMapping("logout")
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    logger.info("用户注销");
    // 获取用户认证信息
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // 存在认证信息，注销
    if (authentication != null) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
  }

  /**
   * 校验密码是否正确
   *
   * @param vUser 带有密码的VUser
   * @return true 正确 false 不正确
   */
  @PostMapping("checkPasswordIsRight")
  public boolean checkPasswordIsRight(@RequestBody VUser vUser) {
    return this.userService.checkPasswordIsRight(vUser);
  }

  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  @PutMapping("updatePassword")
  public void updatePassword(@RequestBody VUser vUser) {
    this.userService.updatePassword(vUser);
  }

  @PostMapping("register")
  public void register(@RequestBody User user) {
    logger.debug("保存");
    userService.save(user);
  }

  @PatchMapping("resetPassword")
  @JsonView(ResetPasswordJsonView.class)
  public String resetPassword(@RequestBody ValidateMessage validateMessage) {
    logger.debug("密码重置");
    return userService.resetPassword(validateMessage);
  }

  /**
   * 保存用户
   *
   * @param user
   * @return
   */
  @PostMapping("add")
  @JsonView(AddUser.class)
  @Secured(YunzhiSecurityRole.ROLE_ADMIN)
  public User save(@RequestBody User user) {
    return userService.save(user);
  }

  /**
   * 更新用户信息;
   *
   * @param id
   * @param user
   */
  @PutMapping("{id}")
  @Secured(YunzhiSecurityRole.ROLE_ADMIN)
  public void update(@PathVariable Long id, @RequestBody User user) {
    userService.update(id, user);
  }

  /**
   * 通过id获取用户
   *
   * @param id
   * @return
   */
  @GetMapping("{id}")
  @Secured(YunzhiSecurityRole.ROLE_ADMIN)
  public User getById(@PathVariable Long id) {
    return this.userService.findById(id);
  }

  @GetMapping("currentLoginUser")
  @JsonView(GetCurrentLoginUserJsonView.class)
  public User getCurrentLoginUser() {
    return this.userService.getCurrentLoginUser().get();
  }

  @GetMapping("sendVerificationCode")
  public void sendVerificationCode(@RequestParam String username) {
    this.userService.sendVerificationCode(username);
  }

  /**
   * 删除用户
   *
   * @param id
   */
  @DeleteMapping("{id}")
  @Secured(YunzhiSecurityRole.ROLE_ADMIN)
  public void delete(@PathVariable Long id) {
    this.userService.delete(id);
  }

  public interface GetCurrentLoginUserJsonView extends User.NameJsonView, User.UsernameJsonView, User.RoleJsonView {
  }

  public interface PageJsonView extends User.UsernameJsonView, User.NameJsonView, User.RoleJsonView {
  }

  public interface LoginJsonView extends User.UsernameJsonView, User.NameJsonView, User.RoleJsonView {
  }

  public interface AddUser extends User.UsernameJsonView, User.NameJsonView {
  }

  public interface ResetPasswordJsonView {
  }
}
