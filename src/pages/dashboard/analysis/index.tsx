import { useMutation } from '@tanstack/react-query';
import { Card, Col, List, Row, Typography } from 'antd';
import Color from 'color';
import { useEffect, useState } from 'react';

import dashboardService, { StatisticsRes } from '@/api/services/dashboardService';
import glass_bag from '@/assets/images/glass/ic_glass_bag.png';
import glass_buy from '@/assets/images/glass/ic_glass_buy.png';
import glass_users from '@/assets/images/glass/ic_glass_users.png';
import { useThemeToken } from '@/theme/hooks';

import AnalysisCard from './analysis-card';

import { UserInfo } from '#/entity';

/**
 * Renders the Analysis component.
 *
 * This component displays various statistics and user information.
 *
 * @returns The rendered Analysis component.
 */
function Analysis() {
  const theme = useThemeToken();
  const [users, setUsers] = useState<[UserInfo]>();
  const [statistics, setStatistics] = useState<StatisticsRes>();
  const getUsersMutation = useMutation({
    mutationFn: dashboardService.getUsers,
  });
  const getStatisticsMutation = useMutation({
    mutationFn: dashboardService.getStatistics,
  });

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await getUsersMutation.mutateAsync();
      setUsers(usersRes);
      const statisticsRes = await getStatisticsMutation.mutateAsync();
      setStatistics(statisticsRes);
    };
    fetchData();
  }, []);
  return (
    <div className="p-2">
      <Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
      <Row gutter={[16, 16]} justify="center">
        <Col lg={8} md={16} span={24}>
          <AnalysisCard
            cover={glass_bag}
            title={statistics ? statistics?.totalUsers.toString() : '0'}
            subtitle="Total Users"
            style={{
              color: theme.colorPrimaryTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorPrimaryActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorPrimary)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={8} md={16} span={24}>
          <AnalysisCard
            cover={glass_users}
            title={statistics ? statistics?.activeSessionsToday.toString() : '0'}
            subtitle="Active Sessions Today"
            style={{
              color: theme.colorInfoTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorInfoActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorInfo).alpha(0.2).toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={8} md={16} span={24}>
          <AnalysisCard
            cover={glass_buy}
            title={statistics ? Math.ceil(statistics?.avgActiveSessions).toString() : '0'}
            subtitle="Avg Active Sessions"
            style={{
              color: theme.colorWarningTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorWarningActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorWarning)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
      </Row>
      <List
        className=""
        grid={{ gutter: 16, column: 2 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item className="mt-4 shadow-md">
            <Card title={user.username} className="min-w-full text-gray-500">
              <div style={{ marginBottom: '8px' }}>
                <p className=" font-bold text-gray-400 ">Sign Up Date:</p>{' '}
                {user.createdAt!.toLocaleString()}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <p className=" font-bold  text-gray-400">Sign In Count:</p>{' '}
                {user.loginCount.toString()}
              </div>
              <div>
                <p className=" font-bold  text-gray-400">Last Session:</p>{' '}
                {user.lastSession.toLocaleString()}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Analysis;
