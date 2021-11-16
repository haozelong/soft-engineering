package club.yunzhi.switchgear.properties;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/23
 * @blog https://segmentfault.com/u/myskies
 * @description
 */
@SpringBootTest
class AppPropertiesTest {
  @Autowired
  AppProperties appProperties;

  @Test
  void test() {
    assertEquals(2, appProperties.getOrigins().size());
  }
}