export interface UserType {
  id: number;
  username: string;
  nickname: string;
  status: number;
  createdAt: string;
  deptUsers: DeptUsersType[]; // 部门信息
  userRoles: RoleUsersType[]; // 角色信息
}

export interface RoleUsersType {
  userId: number;
  roleId: number;
  createTime: Date;
  updateTime: Date;
}

export interface DeptUsersType {
  userId: number;
  deptId: number;
  isPrimary: number;
  createTime: Date;
  updateTime: Date;
}
