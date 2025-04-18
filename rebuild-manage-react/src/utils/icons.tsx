// @/utils/icon.tsx
import * as Icons from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";

export const getIcon = (iconName: string): React.ReactNode => {
  // 检查 iconName 是否有效且存在于 @ant-design/icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent /> : <MenuOutlined />;
};
