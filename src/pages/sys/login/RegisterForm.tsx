import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import userService from '@/api/services/userService';
import { useRouter } from '@/router/hooks';
import userStore from '@/store/userStore';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';
import GoogleBtn from '@/pages/components/GoogleBtn';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export type PasswordValidation = {
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
  hasMinLength: boolean;
};

function RegisterForm() {
  const { replace } = useRouter();
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    hasLower: false,
    hasUpper: false,
    hasDigit: false,
    hasSpecial: false,
    hasMinLength: false,
  });
  const { t } = useTranslation();
  const signUpMutation = useMutation({
    mutationFn: userService.signup,
  });

  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.REGISTER) return null;

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const res = await signUpMutation.mutateAsync(values);
    const { user, accessToken, refreshToken } = res;
    userStore.getState().actions.setUserToken({ accessToken, refreshToken });
    userStore.getState().actions.setUserInfo(user);
    replace(HOMEPAGE);
  };
  const passwordValidator = async () => {
    if (!Object.values(passwordValidation).every((valid) => valid)) {
      return Promise.reject('Password is not valid');
    }
    return Promise.resolve();
  };

  const validatePassword = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordValidation({
      hasLower,
      hasUpper,
      hasDigit,
      hasSpecial,
      hasMinLength,
    });

    // setOpen(!Object.values(passwordValidation).every((valid) => valid));
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signUpFormTitle')}</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('sys.login.emaildPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item name="password" rules={[{ validator: passwordValidator }]}>
          <Input.Password
            type="password"
            placeholder={t('sys.login.password')}
            onChange={(e) => {
              validatePassword(e.target.value);
            }}
          />
        </Form.Item>
        <Flex
          gap="small"
          className="-mt-4 mb-2 rounded-lg border border-gray-300 border-opacity-50 bg-white p-4 shadow-lg"
          vertical
        >
          <p
            className={`text-sm ${passwordValidation.hasLower ? 'text-green-500' : 'text-red-500'}`}
          >
            {passwordValidation.hasLower ? (
              <CheckOutlined style={{ color: '#2255e' }} />
            ) : (
              <CloseOutlined style={{ color: '#ef4444' }} />
            )}{' '}
            At least one lowercase character
          </p>
          <p
            className={`text-sm ${passwordValidation.hasUpper ? 'text-green-500' : 'text-red-500'}`}
          >
            {passwordValidation.hasUpper ? (
              <CheckOutlined style={{ color: '#2255e' }} />
            ) : (
              <CloseOutlined style={{ color: '#ef4444' }} />
            )}{' '}
            At least one uppercase character
          </p>
          <p
            className={`text-sm ${passwordValidation.hasDigit ? 'text-green-500' : 'text-red-500'}`}
          >
            {passwordValidation.hasDigit ? (
              <CheckOutlined style={{ color: '#2255e' }} />
            ) : (
              <CloseOutlined style={{ color: '#ef4444' }} />
            )}{' '}
            At least one digit character
          </p>
          <p
            className={`text-sm ${
              passwordValidation.hasSpecial ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {passwordValidation.hasSpecial ? (
              <CheckOutlined style={{ color: '#2255e' }} />
            ) : (
              <CloseOutlined style={{ color: '#ef4444' }} />
            )}{' '}
            At least one special character
          </p>
          <p
            className={`text-sm ${
              passwordValidation.hasMinLength ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {passwordValidation.hasMinLength ? (
              <CheckOutlined style={{ color: '#2255e' }} />
            ) : (
              <CloseOutlined style={{ color: '#ef4444' }} />
            )}{' '}
            At least 8 characters
          </p>
        </Flex>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t('sys.login.confirmPasswordPlaceholder'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('sys.login.diffPwd')));
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder={t('sys.login.confirmPassword')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('sys.login.registerButton')}
          </Button>
        </Form.Item>
        <Form.Item>
        <GoogleBtn isLogin={false}/>
        </Form.Item>

        <div className="text-gray mb-2 text-xs">
          <span>{t('sys.login.registerAndAgree')}</span>
          <a href="./" className="text-sm !underline">
            {t('sys.login.termsOfService')}
          </a>
          {' & '}
          <a href="./" className="text-sm !underline">
            {t('sys.login.privacyPolicy')}
          </a>
        </div>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default RegisterForm;
