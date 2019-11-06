import { Effect, Model } from 'dva';
import { AnyAction, Reducer } from 'redux';

/**
 * 标签
 */
export type Tag = {
  key: string;
  label: string;
};

/**
 * 登陆状态
 */
export type LoginStatus = 'ok' | 'error';
/**
 * 登陆类型
 */
export type LoginType =
  | 'USERNAME_AND_PASSWORD'
  | 'TEL_CAPTCHA'
  | 'EMAIL_CAPTCHA'
  | 'SWEEP_DINGTALK_CODE';

export interface User {
  uid?: string;
  username?: string;
  realName?: string;
  avatar?: string;
  title?: string;
  group?: string;
  tags?: Tag[];
  notify?: any;
}

export interface AccountModelState {
  status?: LoginStatus;
  type?: LoginType;
  currentUser?: User;
}

export interface AccountModelType extends Model {
  state: AccountModelState;
  reducers: {
    save: Reducer<AccountModelState, AnyAction>;
    clear: Reducer<AccountModelState, AnyAction>;
  };
  effects: {
    login: Effect;
    logout: Effect;
    getCaptcha: Effect;
    getNotify: Effect;
  };
}

const AccountModel: AccountModelType = {
  namespace: 'account',
  state: {},
  reducers: {},
} as AccountModelType;

export default AccountModel;
