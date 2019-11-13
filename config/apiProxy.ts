type Proxy = object | [object, Function];

const proxy: Proxy = {
  '/api': {
    target: 'http://yapi.demo.qunar.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '/mock/811/' },
  },
};

export default proxy;
