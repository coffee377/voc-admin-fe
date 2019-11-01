import { IConfig, IPlugin } from 'umi-types';
import { resolve } from 'path';
import routes from './routes';

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
      dll: {
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
      },
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

/* ref: https://umijs.org/config/ */
const config: IConfig = {
  treeShaking: true,
  plugins,
  routes,
  /* https://webpack.js.org/configuration/resolve/#resolve-alias */
  alias: {
    // api: resolve(__dirname, './src/services/'),
    config: resolve(__dirname, './config'),
    components: resolve(__dirname, './src/components'),
    layouts: resolve(__dirname, './src/layouts'),
    models: resolve(__dirname, './src/models'),
    // routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    // themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
} as IConfig;

module.exports = config;
