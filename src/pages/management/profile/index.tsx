import { Tabs, TabsProps } from 'antd';

import { Iconify } from '@/components/icon';

import ProfileTab from './profile-tab';

/**
 * Renders the user account page.
 *
 * @returns The rendered user account page.
 */
function UserAccount() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center">
          <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />
          <span>General</span>
        </div>
      ),
      children: <ProfileTab />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default UserAccount;
