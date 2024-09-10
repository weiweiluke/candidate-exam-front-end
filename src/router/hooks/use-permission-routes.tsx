import { useMemo } from 'react';

import { getRoutesFromModules } from '../utils';

// 使用 import.meta.glob 获取所有路由组件
const entryPath = '/src/pages';
const pages = import.meta.glob('/src/pages/**/*.tsx');
export const pagesSelect = Object.entries(pages).map(([path]) => {
  const pagePath = path.replace(entryPath, '');
  return {
    label: pagePath,
    value: pagePath,
  };
});

/**
 * return routes about permission
 */
export function usePermissionRoutes() {
  return useMemo(() => {
    return getRoutesFromModules();
  }, []);
}
