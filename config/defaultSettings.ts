import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
  /**
   * theme for nav menu
   */
  navTheme?: MenuTheme;
  /**
   * primary color of ant design
   */
  primaryColor?: string;
  /**
   * nav menu position: `side` or `top`
   */
  layout?: 'side' | 'top';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is top
   */
  contentWidth?: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader?: boolean;
  /**
   * auto hide header
   */
  autoHideHeader?: boolean;
  /**
   * sticky sliderBar
   */
  fixSideBar?: boolean;
  menu?: { locale: boolean };
  /**
   * @deprecated
   * @see siteName
   */
  title?: string;
  pwa?: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl?: string;
  colorWeak?: boolean;
  /**
   * 配置站点名称，应用到登录框，侧边栏顶部的标题文字显示
   */
  siteName?: string;
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

export default {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSideBar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'AntDesign Pro',
  pwa: false,
  iconfontUrl: '',
  siteName: '数据分析平台',
  copyright: '安徽晶奇科技网络股份有限公司-技术研究中心出品',
} as DefaultSettings;
