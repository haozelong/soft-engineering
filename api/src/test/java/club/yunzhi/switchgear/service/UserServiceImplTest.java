package club.yunzhi.switchgear.service;

import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.repository.UserRepository;
import club.yunzhi.switchgear.vo.ValidateMessage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

public class UserServiceImplTest {
  private final UserServiceImpl userService;
  private final ValidationCodeService validationCodeService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserServiceImplTest() {
    this.validationCodeService = Mockito.mock(ValidationCodeService.class);
    this.userRepository = Mockito.mock(UserRepository.class);
    this.passwordEncoder = Mockito.mock(PasswordEncoder.class);
    User.setPasswordEncoder(this.passwordEncoder);
    this.userService = new UserServiceImpl(this.userRepository, this.passwordEncoder, this.validationCodeService);
  }

  @Test
  void resetPassword() {
    ValidateMessage validateMessage = new ValidateMessage();
    validateMessage.setUsername("13920618851");
    validateMessage.setVerificationCode("1234");

    String username = validateMessage.getUsername();

    User user = new User();

    Mockito.doReturn(true).when(validationCodeService).validateCode(Mockito.anyString(), Mockito.anyString());
    Mockito.doReturn(Optional.of(user)).when(userRepository).findByUsername(username);

    String newPassword = this.userService.resetPassword(validateMessage);

    Assertions.assertEquals(newPassword, "yunzhi");
  }

}
