package club.yunzhi.switchgear.service;

import club.yunzhi.switchgear.entity.SystemConfig;

import java.util.Optional;

/**
 * 系统设置
 */
public interface SystemConfigService {
  Optional<SystemConfig> getValueByKey(String key);
}
