export interface MenuItem {
  id: number;
  name: string;
  path: string;
  component: string;
  icon?: string;
  type: number;
  parentId: number;
  orderNum: number;
  permission?: string;
  children?: MenuItem[];
}
