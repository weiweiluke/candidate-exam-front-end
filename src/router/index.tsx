import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';
import AuthGuard from '@/router/components/auth-guard';
import { usePermissionRoutes } from '@/router/hooks';
import { ErrorRoutes } from '@/router/routes/error-routes';

import { AppRouteObject } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};
const GoogleCallbackRoute: AppRouteObject = {
  path: '/oauth2callback',
  Component: lazy(() => import('@/pages/sys/login/GoogleCallback')),
};

const CheckEmailRoute: AppRouteObject = {
  path: '/checkemail',
  Component: lazy(() => import('@/pages/sys/login/CheckEmail')),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  // permissionRoutes.push(CheckEmailRoute);
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
  };

  const routes = [
    LoginRoute,
    asyncRoutes,
    GoogleCallbackRoute,
    ErrorRoutes,
    PAGE_NOT_FOUND_ROUTE,
    CheckEmailRoute,
  ];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}
