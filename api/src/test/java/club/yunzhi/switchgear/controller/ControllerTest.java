package club.yunzhi.switchgear.controller;

import club.yunzhi.switchgear.Config;
import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.util.Optional;

@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@Transactional
@WithMockUser(username = Config.USERNAME, password = Config.PASSWORD)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class ControllerTest {
  protected User currentLoginUser;

  @Autowired
  protected MockMvc mockMvc;

  @MockBean
  protected UserService userService;

  @BeforeAll
  public void baseBeforeAll() {
    this.currentLoginUser = Mockito.spy(new User());
  }

  @BeforeEach
  public void baseBeforeEach() {
    Mockito.doReturn(Optional.of(this.currentLoginUser)).when(this.userService).getCurrentLoginUser();
  }
}