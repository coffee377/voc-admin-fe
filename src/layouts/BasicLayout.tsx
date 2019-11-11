import ProLayout, { DefaultFooter, MenuDataItem } from '@ant-design/pro-layout';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { Link } from 'umi';
import { WithFalse } from '@ant-design/pro-layout/es/typings';
import { Icon, Tabs } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { AnyAction } from 'redux';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import { AccountModelState } from '@/models/account';
import { DispatchProps } from '@/typings';
import { SettingState } from '@/models/settings';

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

  useEffect(() => {
      if (dispatch) {
        dispatch({
          type: 'menu/getMenusByUserId',
          // TODO: 2019/11/11 10:40 替换真实数据
          payload: { uid: '1', token: 'TEST_TOKEN' },
        });
      }
  });

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
  const footerRender: BasicLayoutProps['footerRender'] = (
    props: HeaderViewProps,
    defaultDom: React.ReactNode,
  ) => {
    if (settings && (settings.copyright || settings.links)) {
      return (
        <DefaultFooter
          links={settings.links}
          copyright={settings.copyright || '咖啡之音工作室出品'}
        />
      );
    }
    return defaultDom;
  };

  /** 自定义头右部的 render 方法 */
  const rightContentRender: BasicLayoutProps['rightContentRender'] = (props: HeaderViewProps) => (
    <RightContent {...props} />
  );

  /** menuData 的 render 方法，用来自定义 menuData */
  const menuDataRender: BasicLayoutProps['menuDataRender'] = (): MenuDataItem[] => menuList || [];

  /** 自定义菜单项的 render 方法 */
  const menuItemRender: BasicLayoutProps['menuItemRender'] = (
    menuDataItem,
    defaultDom: React.ReactNode,
  ) => {
    if (menuDataItem.isUrl) {
      // console.log(defaultDom);
      return defaultDom;
      // return (
      //   <a href={menuDataItem.path} target="_blank" rel="noopener noreferrer">
      //     {menuDataItem.name}
      //   </a>
      // );
    }
    return <Link to={menuDataItem.path}>{defaultDom}</Link>;
  };

  const breadcrumbRender = (routers = []) => {
    if (breadcrumbHome) {
      routers.unshift({
        path: breadcrumbHome.path,
        breadcrumbName: breadcrumbHome.name || defaultHome,
      });
    }
    return routers;
  };

  return (
    <ProLayout
      title={settings && (settings.siteName || settings.title)}
      logo={logo || false}
      breakpoint={false}
      // collapsed
      // route={{ routes: [] }}
      onCollapse={handleMenuCollapse}
      rightContentRender={rightContentRender}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      menuItemRender={menuItemRender}
      // breadcrumbRender={breadcrumbRender}
      // pageTitleRender={pageTitleRender}
      // itemRender={(route, params, routes, paths) => {
      //   const first = routes.indexOf(route) === 0;
      //   console.log(`1 => ${JSON.stringify(paths)}`);
      //   console.log(`2 => ${JSON.stringify(paths.join('/'))}`);
      //   // return first ? (
      //   //   <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      //   // ) : (
      //   //   <span>{route.breadcrumbName}AA</span>
      //   // );
      //   // return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
      //   return <Link>{route.breadcrumbName}</Link>;
      //   // return first && breadcrumbHome ? breadcrumbHome : route.breadcrumbName;
      // }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      formatMessage={formatMessage}
      // locale="zh-CN"
      // menuProps={menuProps}
      {...props}
      {...settings}
    >
      {/* <PageHeaderWrapper */}
      {/*  title={false} */}
      {/*  // content={<Icon type="key" />} */}
      {/*  // extraContent={<div style={{ border: '1px red dashed' }}>A</div>} */}
      {/*  // tabList={[ */}
      {/*  //   { key: 'A', tab: 'A', closable: true }, */}
      {/*  //   { key: 'B', tab: 'B', closable: true }, */}
      {/*  //   { key: 'C', tab: 'C', closable: true }, */}
      {/*  // ]} */}
      {/*  // tabActiveKey="" */}
      {/*  // onTabChange={(activeKey: string) => { */}
      {/*  //   message.warn(activeKey); */}
      {/*  //   router.push('/dashboard/monitor'); */}
      {/*  // }} */}
      {/*  // tabBarExtraContent={<div>A</div>} */}
      {/* > */}
      {/* </PageHeaderWrapper> */}
      {children}
      {/* <SettingDrawer/> */}
    </ProLayout>
  );
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
