package club.yunzhi.switchgear.repository;

import club.yunzhi.switchgear.entity.SystemConfig;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SystemConfigRepository extends CrudRepository<SystemConfig, Long> {
  Optional<SystemConfig> getByKeyword(String keyword);
}
