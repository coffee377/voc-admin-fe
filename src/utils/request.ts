/**
 * request 网络请求工具
 * 更详细的 api 文档 : https://github.com/umijs/umi-request
 */
import {
  extend,
  RequestInterceptor,
  RequestOptionsInit,
  ResponseError,
  ResponseInterceptor,
} from 'umi-request';
import { formatMessage } from 'umi-plugin-react/locale';
import hash from 'object-hash';
import { useContext } from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import { BizError, errorKey, Exception } from '@/utils/error';
// TODO: 2019/11/5 15:49 国际化
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

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError): void => {
  const { request, response } = error;

  if (response && response.status) {
    const { status, statusText, url } = response;
    const message = codeMessage[status] || statusText;
    const { method } = request.options;
    const exception: Exception = {
      title: formatMessage({
        id: 'component.exception.request',
        defaultMessage: 'Request Exception',
      }),
      status,
      url,
      method,
      message,
    };
    throw new BizError({ ...exception, key: hash(exception) });
  } else if (!response) {
    const exception: Exception = {
      title: formatMessage({
        id: 'component.exception.network',
        defaultMessage: 'Network Anomalies',
      }),
      message: formatMessage({
        id: 'component.exception.network.description',
        defaultMessage: 'Your network failed to connect to the server',
      }),
    };
    throw new BizError({ ...exception, key: errorKey(exception) });
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  /* 默认错误处理 */
  // errorHandler,
  // headers: {
  //   'x-auth-token': localStorage.getItem('x-auth-token'),
  // },
  /* API 前缀 */
  // prefix: 'http://yapi.demo.qunar.com/mock/811/api',
  /* 默认请求是否带上cookie */
  credentials: 'include',
  // getResponse: true,
});

/**
 * TOKEN 优先级 params > localStorage
 * request拦截器, 改变url 或 options.
 * @param url
 * @param options
 */
const requestInterceptor: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
  const newUrl = url;
  const storageToken = localStorage.getItem('x-auth-token');
  const { token } = options.params;
  const mergeToken = token || storageToken;
  if (mergeToken) {
    const { headers } = options;
    headers['x-auth-token'] = mergeToken;
  }
  return { url: newUrl, options };
};

/**
 * response 拦截器, 处理 response
 * @param response Response
 * @param options RequestOptionsInit
 */
const responseInterceptor: ResponseInterceptor = async (
  response: Response,
  options: RequestOptionsInit,
) => {
  /* 1.用户登陆后存储 TOKEN  */
  // TODO: 2019/11/13 16:13 为提供性能，考虑迁移代码至登陆完成后的逻辑中
  const { url } = response;
  console.log(`url =====> ${url}`);
  // const personal = useContext(RouteContext);
  const loginReg = new RegExp('.*/api/menu.*');
  if (loginReg.test(url)) {
    const { headers } = response;
    const token = headers.get('x-auth-token');
    console.log(token);
    if (token) {
      localStorage.setItem('x-auth-token', token);
    }
  }

  return response;
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

export default request;
