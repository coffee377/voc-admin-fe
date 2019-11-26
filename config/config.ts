/* eslint-disable import/no-unresolved */
import { IConfig, IPlugin } from 'umi-types';
import { resolve } from 'path';
import slash from 'slash';
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

const getLocalIdentName = (context: any, localIdentName: string, localName: string, options) => {
  if (
    context.resourcePath.includes('node_modules') ||
    context.resourcePath.includes('ant.design.pro.less') ||
    context.resourcePath.includes('global.less') ||
    context.resourcePath.includes('layout.less')
  ) {
    return localName;
  }
  const match = context.resourcePath.match(/src(.*)/);

  if (match && match[1]) {
    const antdProPath = match[1].replace('.less', '');
    const arr = slash(antdProPath)
      .split('/')
      .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
      .map((a: string) => a.toLowerCase());
    return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
  }
  return localName;
};

/* ref: https://umijs.org/config/ */
const config: IConfig = {
  treeShaking: true,
  exportStatic: false,
  plugins,
  routes,
  /* https://github.com/webpack-contrib/css-loader */
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: getLocalIdentName,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
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
    utils: resolve(__dirname, 'src/utils'),
    tests: resolve(__dirname, 'tests'),
  },
  /* https://webpack.js.org/configuration/dev-server/#devserver-proxy */
  proxy,
} as IConfig;

module.exports = config;
