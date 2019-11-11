// eslint-disable-next-line import/no-unresolved
import { IRoute } from 'umi-types';

const route: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: './index',
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          // {
          //   path: '/',
          //   redirect: '/home',
          // },
          {
            path: '/home',
            component: './B',
            redirect: '/dashboard/workplace',
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            routes: [
              { path: '/dashboard/workplace', name: 'workplace', component: './A' },
              { path: '/dashboard/analysis', name: 'analysis', component: './B' },
            ],
          },
        ],
      },
    ],
  },
];

const routes: IRoute[] | null = route.length > 0 ? route : null;

export default routes;
