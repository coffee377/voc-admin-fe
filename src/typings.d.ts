import { Action, AnyAction, Dispatch } from 'redux';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import { CSSProperties } from 'react';
import Link from '@/components/Link';

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.ico';

declare module 'umi-types';
declare module 'roadhog-api-doc';

export interface DispatchProps<A extends Action = AnyAction> {
  dispatch?: Dispatch<A>;
}

/**
 * 组件通用样式属性
 */
export interface StyleProps {
  style?: CSSProperties;
  className?: string;
}

export interface VocConfig {
  /**
   * 菜单栏是否折叠
   */
  collapsed: boolean;
  /**
   * 配置站点名称，应用到登录框，侧边栏顶部的标题文字显示，优先级高于 title
   */
  siteName: string;
  /**
   * 超链接
   */
  links: WithFalse<Link[]>;
  /**
   * 是否包含版权声明前缀
   */
  copyrightPrefix: boolean;
  /**
   * 配置版权声明
   */
  copyright: WithFalse<string>;
  /**
   * 配置站点 Logo
   */
  logoPath: string;
  /**
   * 配置项目中接口的前缀
   */
  apiPrefix: string;
  /**
   * 门户入口正则表达式
   */
  portalReg: RegExp;
}

export declare type WithFalse<T> = T | false;
