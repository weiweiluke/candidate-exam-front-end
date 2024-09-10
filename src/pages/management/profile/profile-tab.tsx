import { Button, Col, Form, FormProps, Input, Row, Space, Switch, Card, App } from 'antd';

import { UploadAvatar } from '@/components/upload';
import { useModifyProfile, useUserInfo } from '@/store/userStore';

type FieldType = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

/**
 * Renders the profile tab component.
 *
 * @returns The rendered profile tab component.
 */
export default function ProfileTab() {
  const { message } = App.useApp();
  const { avatar, firstName, lastName, email } = useUserInfo();

  const modifyProfile = useModifyProfile();
  const initFormValues = {
    firstName: firstName || email?.substring(0, email.indexOf('@')),
    lastName,
    email,
  };
  const handleClick: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await modifyProfile({ firstName: values.firstName || '', lastName: values.lastName || '' });
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
        <Card className="flex-col items-center justify-center shadow-md " title="Avatar">
          <div className=" items-center justify-center ">
            <UploadAvatar defaultAvatar={avatar} disabled />
          </div>
          <div className="flex items-center justify-center ">
            <Space className="py-6">
              <div>Public Profile</div>
              <Switch size="small" disabled />
            </Space>
          </div>
          <div className="flex items-center justify-center ">
            <Button type="primary" danger disabled>
              Delete User
            </Button>
          </div>
        </Card>
      </Col>

      <Col span={24} lg={16}>
        <Card title="Your profile" className="shadow-md">
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
            name="profile"
            onFinish={handleClick}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true }]}>
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item<FieldType>
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item<FieldType>
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex w-full justify-end">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
