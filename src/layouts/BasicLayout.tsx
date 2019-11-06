import ProLayout, { BasicLayoutProps as ProLayoutProps, DefaultFooter, MenuDataItem } from '@ant-design/pro-layout';
import { connect, DispatchProp } from 'dva';
import React, { PureComponent } from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import { SettingUp } from '@/typings';

export interface BasicLayoutProps extends ProLayoutProps, DispatchProp {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: SettingUp;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    // return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    return undefined as MenuDataItem;
  });

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
          <DefaultFooter links={settings.links} copyright={settings.copyright || '咖啡之音工作室出品'}/>
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
        /* 自定义菜单项的 render 方法 */
        // menuItemRender={(menuItemProps, defaultDom) =>
        //   (menuItemProps.isUrl ? defaultDom : <a>open {defaultDom}</a>)
        // }
        // formatMessage={formatMessage}
        // menuDataRender={menuDataRender}
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
