export interface DeptType {
  id: number;
  name: string;
  parentId: number;
  orderNum: number;
  status: number;
  leaderId: number;
  createTime: Date;
  updateTime: Date;
  leader: User;
  deptUsers: number[];
}
