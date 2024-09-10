import { Tabs, TabsProps } from 'antd';

import { Iconify } from '@/components/icon';

import SecurityTab from './security-tab';

/**
 * Renders the UserAccount component.
 *
 * @returns The rendered UserAccount component.
 */
function UserAccount() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center">
          <Iconify icon="solar:key-minimalistic-square-3-bold-duotone" size={24} className="mr-2" />
          <span>Security</span>
        </div>
      ),
      children: <SecurityTab />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default UserAccount;
