import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import styles from './index.less';
import { CodePreview } from '@/components';

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
        <CodePreview>npm -v</CodePreview>
      </Fragment>
    );
  }
}

export default Index;
