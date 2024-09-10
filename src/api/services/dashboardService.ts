import apiClient from '../apiClient';

import { UserInfo } from '#/entity';

/**
 * Enum representing the available API endpoints for the dashboard service.
 */
export enum DashboardApi {
  getUsers = 'dashboard/users',
  getStatistics = '/dashboard/statistics',
}
/**
 * Represents the response object for statistics.
 */
export interface StatisticsRes {
  totalUsers: number;
  activeSessionsToday: number;
  avgActiveSessions: number;
}

/**
 * Retrieves a list of users info from the server for dashboard summary.
 *
 * @returns {Promise<UserInfo[]>} A promise that resolves to an array of user information.
 */
const getUsers = () => apiClient.post<[UserInfo]>({ url: DashboardApi.getUsers });

/**
 * Retrieves the statistics from the dashboard API.
 *
 * @returns A promise that resolves to the statistics response.
 */
const getStatistics = () => apiClient.post<StatisticsRes>({ url: DashboardApi.getStatistics });

export default {
  getUsers,
  getStatistics,
};
