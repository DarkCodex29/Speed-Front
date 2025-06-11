import { IUserNoticeValidity } from '../user-notice-validity.interface';

export interface ISecurityModalModel {
  id: number;
  usuarios: IUserNoticeValidity[];
  esConfidencial: boolean;
}
