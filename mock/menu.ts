import { Request, Response } from 'express';
import { MenuDataItem } from '@ant-design/pro-layout';

const customMenu: MenuDataItem[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    locale: 'menu.dashboard',
    icon: 'dashboard',
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        locale: 'menu.dashboard.workplace',
        icon: 'home',
        // component: './index',
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        locale: 'menu.dashboard.analysis',
        icon: 'bar-chart',
        // component: './dashboard/analysis',
        // authority: ['admin', 'user'],
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        locale: 'menu.dashboard.monitor',
        icon: 'monitor',
        // component: './dashboard/monitor',
        // authority: ['admin', 'user'],
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'setting',
    locale: 'menu.admin',
    // authority: ['admin', 'user'],
    children: [
      {
        path: '/admin/organization',
        name: 'organization',
        locale: 'menu.admin.organization',
        icon: 'apartment',
      },
      {
        path: '/admin/user',
        name: 'user',
        locale: 'menu.admin.user',
        icon: 'user',
      },
      {
        path: '/admin/authority',
        name: 'authority',
        locale: 'menu.admin.authority',
        icon: 'key',
      },
    ],
  },
];

const isValidToken: (token: string) => boolean = (token: string) => !!(token && token === 'TEST_TOKEN');

export default {
  'GET /menu/1': (req: Request, res: Response) => {
    const { token } = req.query;
    if (isValidToken(token)) {
      res.status(200).json(customMenu);
      // res.status(200).json({ code: 2, message: 'ok', data: customMenu });
      // res.status(500).json();
      // res.status(200).json({ code: 2, message: 'successs' });
    } else {
      res.status(403).json({ message: '没有访问权限' });
    }
  },
};
