import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const ProfilePage = lazy(() => import('@/pages/management/profile'));
const SecurityPage = lazy(() => import('@/pages/management/security'));

const management: AppRouteObject = {
  order: 2,
  path: 'management',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.management',
    icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,
    key: '/management',
  },
  children: [
    {
      index: true,
      element: <Navigate to="profile" replace />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
      meta: { label: 'sys.menu.user.profile', key: '/management/profile' },
    },
    {
      path: 'security',
      element: <SecurityPage />,
      meta: { label: 'sys.menu.user.resetpwd', key: '/management/security' },
    },
  ],
};

export default management;
