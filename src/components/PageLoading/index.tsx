import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

import { Spin } from 'antd';

interface PageLoadingProps {
  spinning: boolean;
}

const PageLoading = (props: PageLoadingProps) => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin
      size="large"
      spinning={props.spinning}
      tip={formatMessage({ id: 'page.loading', defaultMessage: 'Loading' })}
    />
  </div>
);

export default PageLoading;
