import { Random } from 'mockjs';
import { delay } from 'roadhog-api-doc';
import { Request, Response } from 'express';
import defaultSettings from '../config/defaultSetting';

const proxy = {
  /* 获取配置 */
  // 'GET /settings': defaultSettings,
  'GET /settings': (req: Request, res: Response) => {
    res.status(200).json({ success: true, code: '0', message: 'OK', data: defaultSettings });
  },
  /* 更新配置 */
  'PUT /settings': (req: Request, res: Response) => {
    const data = req.body;
    res.status(200).json({ ...defaultSettings, ...data });
  },
};

// 调用 delay 函数，统一处理
const ms = Random.integer(500, 2000);
module.exports = delay(proxy, ms);
