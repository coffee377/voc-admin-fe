import { Action, AnyAction, Dispatch } from 'redux';
import { Settings } from '@ant-design/pro-layout';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import Link from '@/components/Link';

declare module '*.css';
declare module '*.png';
declare module '*.ico';

declare module 'umi-types';
declare module 'roadhog-api-doc';

export interface DispatchProps<A extends Action = AnyAction> {
  dispatch?: Dispatch<A>;
}

/**
 * 扩展配置
 */
export interface SettingUp extends Settings {
  /**
   * 菜单栏是否折叠
   */
  collapsed?: boolean;
  /**
   * 打开菜单项
   */
  openKeys?: string[];
  /**
   * 配置站点名称，应用到登录框，侧边栏顶部的标题文字显示，优先级高于 title
   */
  siteName?: string;
  /**
   * 超链接
   */
  links?: WithFalse<Link[]>;
  /**
   * 配置版权声明
   */
  copyright?: string;
  /**
   * 配置站点 Logo
   */
  logoPath?: string;
  /**
   * 配置项目中接口的前缀
   */
  apiPrefix?: string;
}
