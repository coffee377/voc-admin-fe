import ProLayout, {
  RouteContext,
  DefaultFooter,
  MenuDataItem,
  PageHeaderWrapper,
} from '@ant-design/pro-layout';
import { connect, useDispatch } from 'dva';
import React, { useEffect, Fragment, PureComponent } from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { Link } from 'umi';
import { WithFalse } from '@ant-design/pro-layout/es/typings';
import { Breadcrumb, Icon, Tabs } from 'antd';
import { formatMessage, getLocale } from 'umi-plugin-react/locale';
import { AnyAction } from 'redux';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import { AccountModelState } from '@/models/account';
import { DispatchProps } from '@/typings';
import { SettingState } from '@/models/settings';
import Footer, { defaultCopyrightPrefix } from '@/components/Footer';

export interface BreadcrumbHome {
  path: string;
  name?: React.ReactNode;
}

export interface SettingsProps extends SettingState {}

export interface BasicLayoutProps extends DispatchProps<AnyAction> {
  showPageTitle?: boolean;
  breadcrumbHome?: WithFalse<BreadcrumbHome>;
  settings?: SettingsProps;
  menuList?: MenuDataItem[];
  account?: AccountModelState;
}

// export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
//   breadcrumbNameMap: {
//     [path: string]: MenuDataItem;
//   };
// };

const defaultHome = <Icon type="home" />;

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  /* https://github.com/ant-design/ant-design-pro-layout */
  /* https://ant-design.github.io/ant-design-pro-layout/ */
  const { dispatch, children, breadcrumbHome, settings, account, menuList } = props;

  /**
   * 获取初始化数据
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'menu/getMenusByUserId',
        // TODO: 2019/11/11 10:40 替换真实数据
        payload: { uid: '1', lang: getLocale() },
      });
    }
  }, []);

  /**
   * 菜单的折叠收起事件
   */
  const handleMenuCollapse: BasicLayoutProps['onCollapse'] = (collapsed: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'settings/save',
        payload: { collapsed },
      });
    }
  };

  /**
   * 自定义页脚的 render 方法
   */
  const footerRender: BasicLayoutProps['footerRender'] = () => (
    <Footer
      links={settings.links}
      copyright={{
        prefix: settings.copyrightPrefix,
        copyright: settings.copyright,
      }}
    />
  );

  /** 自定义头右部的 render 方法 */
  const rightContentRender: BasicLayoutProps['rightContentRender'] = (props: HeaderViewProps) => (
    <RightContent {...props} />
  );

  /** menuData 的 render 方法，用来自定义 menuData */
  const menuDataRender: BasicLayoutProps['menuDataRender'] = (): MenuDataItem[] => menuList || [];

  /** 自定义菜单项的 render 方法 */
  const menuItemRender: BasicLayoutProps['menuItemRender'] = (
    menuDataItem: MenuDataItem & { isUrl: boolean },
    defaultDom: React.ReactNode,
  ) => {
    /* 叶子节点 */
    if (!menuDataItem.children) {
      if (menuDataItem.isUrl) {
        return (
          <a href={menuDataItem.path} target="_blank" rel="noopener noreferrer">
            {menuDataItem.name}
          </a>
        );
      }
      return <Link to={menuDataItem.path}>{defaultDom}</Link>;
    }
    return defaultDom;
  };

  const breadcrumbRender = (routers = []) => {
    if (breadcrumbHome) {
      /* 添加主页面包屑 */
      routers.unshift({
        path: breadcrumbHome.path,
        breadcrumbName: breadcrumbHome.name || defaultHome,
      });
    }
    return routers;
  };

  const itemRender = (route, params, routes, paths) => {
    const first = routes.indexOf(route) === 0;
    if (breadcrumbHome && first) {
      const to = route.path.startsWith('/') ? route.path : `/${route.path}`;
      return <Link to={to}>{route.breadcrumbName}</Link>;
    }
    return <span>{route.breadcrumbName}</span>;
  };

  return (
    <ProLayout
      logo={logo || false}
      breakpoint={false}
      onCollapse={handleMenuCollapse}
      rightContentRender={rightContentRender}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      menuItemRender={menuItemRender}
      breadcrumbRender={breadcrumbRender}
      // // pageTitleRender={pageTitleRender}
      itemRender={itemRender}
      formatMessage={formatMessage}
      {...props}
      {...settings}
      title={settings && (settings.siteName || settings.title)}
    >
      <PageHeaderWrapper
        title={false}
        content={<Icon type="key" />}
        extraContent={<div style={{ border: '1px red dashed' }}>A</div>}
        // tabActiveKey="" */}
        // onTabChange={(activeKey: string) => { */}
        //   message.warn(activeKey); */}
        //   router.push('/dashboard/monitor'); */}
        // }} */}
        // tabBarExtraContent={<div>A</div>} */}
        // pageHeaderRender={pageHeaderRender}
      >
        {/* <RouteContext.Consumer> */}
        {/*  {value => console.log(value.breadcrumb)} */}
        {/* </RouteContext.Consumer> */}
        {children}
      </PageHeaderWrapper>
      {/* <SettingDrawer/> */}
    </ProLayout>
  );
  // {/*  // content={<Icon type="key" />} */}
  // {/*  // extraContent={<div style={{ border: '1px red dashed' }}>A</div>} */}
  // {/*  // tabList={[ */}
  // {/*  //   { key: 'A', tab: 'A', closable: true }, */}
  // {/*  //   { key: 'B', tab: 'B', closable: true }, */}
  // {/*  //   { key: 'C', tab: 'C', closable: true }, */}
  // {/*  // ]} */}
  // {/*  // tabActiveKey="" */}
  // {/*  // onTabChange={(activeKey: string) => { */}
  // {/*  //   message.warn(activeKey); */}
  // {/*  //   router.push('/dashboard/monitor'); */}
  // {/*  // }} */}
  // {/*  // tabBarExtraContent={<div>A</div>} */}
};

/* 默认属性 */
BasicLayout.defaultProps = {
  showPageTitle: false,
  breadcrumbHome: { path: '/home', name: defaultHome },
  menuList: [],
};

const mapState2Props = ({
  settings,
  account,
  menu,
}: {
  settings: SettingState;
  account: AccountModelState;
  menu: MenuDataItem[];
}) => ({
  settings,
  account,
  menuList: menu,
});

export default connect(mapState2Props)(BasicLayout);
