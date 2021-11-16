package club.yunzhi.switchgear.controller;

import club.yunzhi.switchgear.service.ValidationCodeService;
import club.yunzhi.switchgear.vo.ValidateMessage;
import com.alibaba.fastjson.JSON;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(UserControllerTest.class);

  @Autowired
  private ValidationCodeService validationCodeService;

  @Test
  void resetPassword() throws Exception {
    String url = "/user/resetPassword";

    logger.debug("构造一个新用户和验证码");
    ValidateMessage validateMessage = new ValidateMessage();
    validateMessage.setUsername("13920618851");
    validateMessage.setVerificationCode("1234");

    String username = validateMessage.getUsername();

    String jsonString = JSON.toJSONString(validateMessage);

    logger.debug("mock请求方法");
    Mockito.doReturn("yunzhi").when(this.userService).resetPassword(Mockito.any(ValidateMessage.class));

    this.mockMvc.perform(MockMvcRequestBuilders.patch(url)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonString))
            .andExpect(MockMvcResultMatchers.jsonPath("$").value("yunzhi"))
            .andExpect(MockMvcResultMatchers.status().isOk());


    logger.debug("测试验证码正确");
    String code = this.validationCodeService.sendCode(username);
    HttpHeaders headers = new HttpHeaders();
    HttpEntity entity = new HttpEntity<>(validateMessage, headers);
    validateMessage.setVerificationCode(code);
    Boolean result = this.validationCodeService.validateCode(username, code);
    Assertions.assertEquals(true, result);
  }
}
