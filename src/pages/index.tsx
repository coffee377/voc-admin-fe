import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';
import { Table } from 'antd';
import styles from './index.less';
import CSSGridLayout from '@/layouts/DemonLayout';
import { CodePreview } from '@/components';
import DemonLayout from '@/layouts/DemonLayout';

interface IndexProps {
  dispatch: Dispatch<any>;
}

// @connect()
class Index extends Component<IndexProps> {
  componentDidMount(): void {
    // this.props.dispatch({
    //   type: 'settings/init',
    //   payload: {},
    // });
  }

  render() {
    return (
      <Fragment>
        {/* <div className={styles.normal}> */}
        {/*  <div className={styles.welcome} /> */}
        {/*  <ul className={styles.list}> */}
        {/*    <li> */}
        {/*      To get started, edit <code>src/pages/index.js</code> and save to reload. */}
        {/*    </li> */}
        {/*    <li> */}
        {/*      <a href="https://umijs.org/guide/getting-started.html"> */}
        {/*        {formatMessage({ id: 'index.start' })} */}
        {/*      </a> */}
        {/*    </li> */}
        {/*  </ul> */}
        {/* </div> */}
        {/* <CodePreview>npm -v</CodePreview> */}
        {/* <CodePreview> */}
        {/*  <Link to="/home">主页</Link> */}
        {/* </CodePreview> */}
        <DemonLayout />
      </Fragment>
    );
  }
}

export default Index;
