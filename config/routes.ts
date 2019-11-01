// eslint-disable-next-line import/no-unresolved
import { IRoute } from 'umi-types';

const route: IRoute[] = [
  // {
  //   path: '/index',
  //   component: './index',
  // },
  // {
  //   path: '/404',
  //   component: './404',
  // },
];

const routes: IRoute[] | null = route.length > 0 ? route : null;

export default routes;
