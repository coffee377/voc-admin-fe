// eslint-disable-next-line import/no-unresolved
import { IRoute } from 'umi-types';

const route: IRoute[] = [
  {
    path: '/',
    // component: '../layouts/BlankLayout',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        component: './index',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        authority: ['admin', 'user'],
        routes: [
          {
            name: 'workplace',
            icon: 'home',
            path: '/dashboard/workplace',
            // component: './dashboard/workplace',
          },
          {
            name: 'analysis',
            icon: 'bar-chart',
            path: '/dashboard/analysis',
            // component: './dashboard/analysis',
            // authority: ['admin', 'user'],
          },
          {
            name: 'monitor',
            icon: 'monitor',
            path: '/dashboard/monitor',
            // component: './dashboard/monitor',
            // authority: ['admin', 'user'],
          },
        ],
      },
      {
        name: 'admin',
        icon: 'setting',
        path: '/admin',
        authority: ['admin', 'user'],
        routes: [
          {
            name: 'org',
            icon: 'apartment',
            path: '/admin/om',
          },
          {
            name: 'user',
            icon: 'user',
            path: '/admin/user',
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    component: './404',
  },
];

const routes: IRoute[] | null = route.length > 0 ? route : null;

export default routes;
