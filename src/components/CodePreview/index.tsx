import { Typography } from 'antd';
import React from 'react';
import styles from './style.less';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.code}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default CodePreview;
