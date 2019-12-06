import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';
import { Table } from 'antd';
import styles from './index.less';
import { CodePreview } from '@/components';
import DemonLayout from '@/layouts/DemonLayout';
import { EventMap } from '@/components/Echarts';
import Rank from '@/components/Ranking';

interface IndexProps {
  dispatch: Dispatch<any>;
  events?: EventMap;
}

// @connect()
class Index extends Component<IndexProps, any> {
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
        <div style={{ margin: '60px 100px', border: '1px green dashed', padding: '8px 12px' }}>
          <Rank
            title="总费用排名 Top5"
            dataset={[
              {
                name: '中国科学技术大学附属第一医院(安徽省立医院)',
                value: 16767.46,
              },
              {
                name: '安徽医科大学第一附属医院',
                value: 11652.37,
              },
              {
                name: '安徽中医药大学第一附属医院',
                value: 6408.0,
              },
              {
                name: '中国人民解放军联勤保障部队第九〇一医院',
                value: 2183.84,
              },
              {
                name: '武警安徽总队医院',
                value: 1445.04,
              },
            ]}
          />
        </div>
      </Fragment>
    );
  }
}

export default Index;
