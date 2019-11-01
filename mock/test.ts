import { Request, Response } from 'express';
import Mock, { Random } from 'mockjs';
import { delay } from 'roadhog-api-doc';

const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  '/api/users/create': (req: Request, res: Response) => {
    res.end('OK2');
  },

  // 使用 mockjs 等三方库
  'GET /api/tags': Mock.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),

  // 动态的
  '/api/random': (req: Request, res: Response) => {
    res.send(
      Mock.mock({
        // 每次请求均产生随机值
        'number|1-100': 100,
      }),
    );
  },
};

// 调用 delay 函数，统一处理
const ms = Random.integer(500, 2000);
module.exports = delay(proxy, ms);
