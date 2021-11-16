package club.yunzhi.switchgear.enums;

/**
 * 监听器类型
 */
public enum ListenerTypeEnum {
  VOLTAGE((byte) 0x00, "电压"),
  ULTRASONIC((byte) 0x01, "超声波");
  Byte value;
  String description;

  ListenerTypeEnum(Byte value, String description) {
    this.value = value;
    this.description = description;
  }

  public Byte getValue() {
    return value;
  }
}