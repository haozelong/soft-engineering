package club.yunzhi.switchgear.service;

import club.yunzhi.switchgear.entity.SystemConfig;
import club.yunzhi.switchgear.repository.SystemConfigRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SystemConfigServiceImpl implements SystemConfigService {
  private final SystemConfigRepository systemConfigRepository;

  public SystemConfigServiceImpl(SystemConfigRepository systemConfigRepository) {
    this.systemConfigRepository = systemConfigRepository;
  }

  @Override
  public Optional<SystemConfig> getValueByKey(String key) {
    return this.systemConfigRepository.getByKeyword(key);
  }
}
