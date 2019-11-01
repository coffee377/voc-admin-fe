import React, { Fragment } from 'react';
import { BackTop } from 'antd';

const Layout: React.FC = props => (
  <Fragment>
    <div>{props.children}</div>
    <BackTop visibilityHeight={0} />
  </Fragment>
);

export default Layout;
