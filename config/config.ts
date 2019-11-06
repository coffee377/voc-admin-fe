/* eslint-disable import/no-unresolved */
import { IConfig, IPlugin } from 'umi-types';
import { resolve } from 'path';
import routes from './routes';
import proxy from './apiProxy';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
        /* 推荐开启 dva-immer 以简化 reducer 编写 */
        immer: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        webpackChunkName: true,
        // loadingComponent: './components/PageLoading/index',
      },
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
      // },
      // pwa: {
      //   manifestOptions: {
      //     srcPath: 'manifest.json',
      //   },
      // },
      // title: 'hms',
      // routes: {
      //   exclude: [
      //     /models\//,
      //     /services\//,
      //     /model\.(t|j)sx?$/,
      //     /service\.(t|j)sx?$/,
      //     /components\//,
      //   ],
      // },
    },
  ],
] as IPlugin[];

const { NODE_ENV } = process.env;

/* 是否开发模式 */
const developmentMode = NODE_ENV !== 'production';

/* ref: https://umijs.org/config/ */
const config: IConfig = {
  treeShaking: true,
  exportStatic: false,
  plugins,
  routes,
  /* 定义环境变量 */
  define: {},
  devtool: developmentMode ? 'source-map' : false,
  /* https://webpack.js.org/configuration/resolve/#resolve-alias */
  alias: {
    assets: resolve(__dirname, 'src/assets'),
    config: resolve(__dirname, './config'),
    components: resolve(__dirname, 'src/components'),
    documents: resolve(__dirname, 'src/documents'),
    layouts: resolve(__dirname, 'src/layouts'),
    models: resolve(__dirname, 'src/models'),
    // routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, 'src/services'),
    // themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, 'src/utils'),
  },
  /* https://webpack.js.org/configuration/dev-server/#devserver-proxy */
  proxy,
} as IConfig;

module.exports = config;
