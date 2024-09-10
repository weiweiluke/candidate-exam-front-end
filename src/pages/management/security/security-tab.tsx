import { App, Button, Form, FormProps, Input } from 'antd';

import Card from '@/components/card';
import { useModifyPassword } from '@/store/userStore';

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};
/**
 * Renders the SecurityTab component.
 *
 * This component displays a form for modifying the user's password.
 * It includes input fields for the old password, new password, and confirm new password.
 * When the form is submitted, the password modification is attempted.
 * If successful, a success message is displayed.
 * If there is an error, a warning message is displayed.
 *
 * @returns The rendered SecurityTab component.
 */
export default function SecurityTab() {
  const { message } = App.useApp();
  const initFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const modifyPassword = useModifyPassword();
  const handleClick: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await modifyPassword({
        oldPassword: values.oldPassword || '',
        newPassword: values.newPassword || '',
      });
      message.success({
        content: 'Password modified successfully',
        duration: 3,
      });
    } catch (error) {
      message.warning({
        content: error.message,
        duration: 3,
      });
    }
  };

  return (
    <Card className="!h-auto flex-col">
      <Form
        layout="vertical"
        initialValues={initFormValues}
        labelCol={{ span: 8 }}
        className="w-full"
        onFinish={handleClick}
      >
        <Form.Item<FieldType> label="Old Password" name="oldPassword">
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password cannot be the same as the old password!'),
                );
              },
            }),
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Re-enter new password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="flex w-full justify-end">
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Card>
  );
}
