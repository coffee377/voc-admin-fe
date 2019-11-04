import Link from 'umi/link';
import { Result, Button } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

const Forbidden = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'component.exception.description.403',
      defaultMessage: "Sorry, you don't have access to this page.",
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'component.exception.back', defaultMessage: 'Back Home' })}
        </Button>
      </Link>
    }
  />
);

export default Forbidden;
