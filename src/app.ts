import { notification } from 'antd';

export const dva = {
  config: {
    onError: (err: ErrorEvent) => {
      err.preventDefault();
      notification.error({ message: err.message });
      // console.error(`====>${err}`);
    },
  },
};
