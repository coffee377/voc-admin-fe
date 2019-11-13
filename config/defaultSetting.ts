import { SettingState } from '@/models/settings';

const defaultSetting: SettingState = {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  // title: 'AntDesign Pro',
  pwa: false,
  iconfontUrl: '',
  collapsed: true,
  siteName: '数据分析平台',
  portalReg: '.*/api/menu.*',
  // links: [
  //   {
  //     title: '百度',
  //     href: 'https://www.baidu.com/',
  //     blankTarget: true,
  //   },
  // ],
  // links: false,
  // copyrightPrefix: false,
  // copyright: false,
  // copyright: '安徽晶奇科技网络股份有限公司 - 技术研究中心出品',
} as SettingState;

export default defaultSetting;
