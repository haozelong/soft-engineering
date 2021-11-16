package club.yunzhi.switchgear.service;


import club.yunzhi.switchgear.entity.User;
import club.yunzhi.switchgear.vo.VUser;
import club.yunzhi.switchgear.vo.ValidateMessage;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * @author haozelong
 */
public interface UserService {

    User findByUsername(String username);

    /**
     * 获取登录用户
     *
     * @return 登录用户 | null
     */
    Optional<User> getCurrentLoginUser();

    /**
     * 发送验证码.
     *
     * @param phoneNumber 手机号码
     */
    void sendVerificationCode(String phoneNumber);

    /**
     * 校验密码是否正确
     *
     * @param vUser 带有密码的VUser
     * @return true 正确 false 不正确
     */
    boolean checkPasswordIsRight(VUser vUser);

    /**
     * 修改密码
     *
     * @param vUser 带有新密码和旧密码VUser
     */
    void updatePassword(VUser vUser);

//    /**
//     * 重置密码
//     * @param validateMessage
//     */
//    void resetPassword(ValidateMessage validateMessage);

    /**
     * 综合查询
     * @param name 用户姓名
     * @param username 用户手机号
     * @param pageable
     * @return
     */
    Page<User> getAll(String name, String username, @NotNull Pageable pageable);

    /**
     * 根据id获取用户
     * @param id
     * @return
     */
    User findById(Long id);

    /**
     * 更新用户
     * @param id
     * @param user
     */
    void update(Long id, User user);

    /**
     * 删除用户
     * @param id 学生ID
     */
    void delete(Long id);

    /**
     * 保存用户
     * @param user
     * @return
     */
    User save(User user);


    /**
     * 重置密码
     * @param validateMessage
     */
    String resetPassword(ValidateMessage validateMessage);
}
