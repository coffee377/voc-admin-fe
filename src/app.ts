import { formatMessage } from 'umi-plugin-react/locale';
import { notice } from '@/components/Exception';
import { errorKey } from '@/utils/error';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

export const dva = {
  config: {
    onError: (err: ErrorEvent) => {
      err.preventDefault();
      const { name } = err;
      let exception;
      if (name === 'ResponseError') {
        const { data, request, response } = err;
        console.log(data);
        if (response && response.status) {
          const { status, statusText, url } = response;
          let { message } = data;
          message = message || codeMessage[status] || statusText;
          const { method } = request.options;
          exception = {
            title: formatMessage({
              id: 'component.exception.request',
              defaultMessage: 'Request Exception',
            }),
            status,
            url,
            method,
            message,
          };
        } else if (!response) {
          exception = {
            title: formatMessage({
              id: 'component.exception.network',
              defaultMessage: 'Network Anomalies',
            }),
            message: formatMessage({
              id: 'component.exception.network.description',
              defaultMessage: 'Your network failed to connect to the server',
            }),
          };
        }
        // notice({ ...exception, key: errorKey(exception) });
      }
      notice({ ...exception, key: errorKey(exception) });
    },
  },
};

// const calException = (error: ResponseError) => {
//   const { request, response } = error;
//   const exception: Exception = {
//     title: formatMessage({
//       id: 'component.exception.network',
//       defaultMessage: 'Network Anomalies',
//     }),
//     message: formatMessage({
//       id: 'component.exception.network.description',
//       defaultMessage: 'Your network failed to connect to the server',
//     }),
//   };
//   return { ...exception, key: errorKey(exception) };
// };
