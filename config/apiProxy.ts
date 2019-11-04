type Proxy = object | [object, Function];

const proxy: Proxy = {
  '/api': {
    target: 'http://yapi.demo.qunar.com/mock/811/',
    changeOrigin: true,
    // pathRewrite: { '^/api': '' },
  },
};

export default proxy;
