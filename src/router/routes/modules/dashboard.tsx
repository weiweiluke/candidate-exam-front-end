import { lazy } from 'react';

import { SvgIcon } from '@/components/icon';

import { AppRouteObject } from '#/router';

const Analysis = lazy(() => import('@/pages/dashboard/analysis'));

const dashboard: AppRouteObject = {
  order: 1,
  path: 'dashboard',
  element: <Analysis />,
  meta: {
    label: 'sys.menu.dashboard',
    icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
    key: '/dashboard',
  },
};

export default dashboard;
