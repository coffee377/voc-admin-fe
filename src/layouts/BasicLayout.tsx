import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  DefaultFooter,
  MenuDataItem,
  PageHeaderWrapper,
} from '@ant-design/pro-layout';
import { connect, DispatchProp } from 'dva';
import React, { PureComponent } from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';
import { Authorized } from 'ant-design-pro';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import { SettingUp } from '@/typings';

export interface BasicLayoutProps extends ProLayoutProps, DispatchProp {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: SettingUp;
}

// export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
//   breadcrumbNameMap: {
//     [path: string]: MenuDataItem;
//   };
// };

@connect(({ settings, loading }: { settings: SettingUp; loading: { effects: any } }) => ({
  settings,
  // currentLoading: loading.effects['dashboardAndMonitor/init'],
}))
class BasicLayout extends PureComponent<BasicLayoutProps> {
  render() {
    const { dispatch, children, settings } = this.props;

    /**
     * 菜单的折叠收起事件
     */
    const handleMenuCollapse: BasicLayoutProps['onCollapse'] = (payload: boolean): void => {
      if (dispatch) {
        dispatch({
          // type: 'global/changeLayoutCollapsed',
          type: 'settings/save',
          payload: { collapsed: payload },
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
      if (settings.copyright || settings.links) {
        return (
          <DefaultFooter
            links={settings.links}
            copyright={settings.copyright || '咖啡之音工作室出品'}
          />
        );
      }
      return defaultDom;
    };

    /**
     * 自定义头右部的 render 方法
     */
    const rightContentRender: BasicLayoutProps['rightContentRender'] = (props: HeaderViewProps) => (
      <RightContent {...props} />
    );

    const customMenu: MenuDataItem[] = [
      {
        path: '/dashboard',
        name: 'dashboard',
        locale: 'menu.dashboard',
        icon: 'dashboard',
        children: [
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            locale: 'menu.dashboard.workplace',
            icon: 'home',
            // component: './index',
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            locale: 'menu.dashboard.analysis',
            icon: 'bar-chart',
            // component: './dashboard/analysis',
            // authority: ['admin', 'user'],
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            locale: 'menu.dashboard.monitor',
            icon: 'monitor',
            // component: './dashboard/monitor',
            // authority: ['admin', 'user'],
          },
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'setting',
        locale: 'menu.admin',
        // authority: ['admin', 'user'],
        children: [
          {
            path: '/admin/organization',
            name: 'organization',
            locale: 'menu.admin.organization',
            icon: 'apartment',
          },
          {
            path: '/admin/user',
            name: 'user',
            locale: 'menu.admin.user',
            icon: 'user',
          },
          {
            path: '/admin/authority',
            name: 'authority',
            locale: 'menu.admin.authority',
            icon: 'key',
          },
        ],
      },
    ];

    const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => customMenu;

    const menuItemRender: BasicLayoutProps['menuItemRender'] = (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl) {
        return defaultDom;
      }
      // return <a href={menuItemProps.path}/>
      return <Link to={menuItemProps.path}>{defaultDom}</Link>;
    };
    return (
      /* https://github.com/ant-design/ant-design-pro-layout */
      /* https://ant-design.github.io/ant-design-pro-layout/ */
      <ProLayout
        settings={settings}
        {...settings}
        onCollapse={handleMenuCollapse}
        title={settings.siteName || settings.title}
        logo={logo || false}
        footerRender={footerRender}
        /* menuData 的 render 方法，用来自定义 menuData */
        menuDataRender={menuDataRender}
        /* 自定义菜单项的 render 方法 */
        menuItemRender={menuItemRender}
        // pageTitleRender={() => 'A'}
        formatMessage={formatMessage}
        rightContentRender={rightContentRender}
        fixedHeader
        // locale="zh-CN"
      >
        {children}
        {/* <SettingDrawer/> */}
      </ProLayout>
    );
  }
}

export default BasicLayout;
