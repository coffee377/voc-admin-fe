import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { BackTop } from 'antd';
import styles from './index.less';

interface IndexProps {
  dispatch: Dispatch<any>;
}

@connect()
class Index extends Component<IndexProps> {
  componentDidMount(): void {
    this.props.dispatch({
      type: 'settings/init',
      payload: {},
    });
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>
            To get started, edit <code>src/pages/index.js</code> and save to reload.
          </li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">
              {formatMessage({ id: 'index.start' })}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

// const Index: React.FC = () => (
//   <div className={styles.normal}>
//     <div className={styles.welcome} />
//     <ul className={styles.list}>
//       <li>
//         To get started, edit <code>src/pages/index.js</code> and save to reload.
//       </li>
//       <li>
//         <a href="https://umijs.org/guide/getting-started.html">
//           {formatMessage({ id: 'index.start' })}
//         </a>
//       </li>
//     </ul>
//     {/* <PageLoading /> */}
//   </div>
// );

export default Index;
