import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: Date;
  role?: Role;
  status?: BasicStatus;
  isEmailVerified: boolean;
  permissions?: Permission[];
  userActivities?: UserActivity[];
  lastSession: Date;
  loginCount: number;
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface UserActivity {
   id: number;
   activityDate: Date;
   activityCount: number;
   userId: number;
   loginCount: number; 
   lastSessionTimestamp: Date; 
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
