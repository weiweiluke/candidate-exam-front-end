import { useMutation } from '@tanstack/react-query';
import { Button, Card, Typography, message as Message } from 'antd';
import { useEffect, useState } from 'react';

import userService from '@/api/services/userService';
import { useRouter } from '@/router/hooks';
import useUserStore, { useUserInfo, useUserToken } from '@/store/userStore';

import { UserInfo } from '#/entity';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const { Title, Paragraph } = Typography;

/**
 * Renders a component for checking and verifying the user's email address.
 *
 * @returns The CheckEmail component.
 */
function CheckEmail() {
  const [state, setState] = useState('resend');
  const [token, setToken] = useState('');
  const router = useRouter();
  const userStore = useUserStore();
  const userInfo = useUserInfo();
  const [loading, setLoading] = useState(false);
  const {accessToken} = useUserToken();
  const email = userInfo?.email || '';

  if (!userInfo || userInfo.isEmailVerified) {
    router.replace(HOMEPAGE);
  }

  useEffect(() => {

    if (userInfo?.isEmailVerified) {
      router.replace('/');
    }
    const { hash } = window.location;
    const searchParams = new URLSearchParams(hash.slice(hash.indexOf('?')));
    const token = searchParams.get('token');
    if (token !== null) {
      setToken(token);
      setState('verify');
      verifyEmail(token);
    }
    if(!accessToken){
      router.replace('/login');
    }
  }, [userInfo, router]);
  const resendMailMutation = useMutation({
    mutationFn: userService.resendMail,
  });
  const verifyMailMutation = useMutation({
    mutationFn: userService.verifyMail,
  });
  const onBtnClick = async () => {
    setLoading(true);
    try {
      if (state === 'resend') {
        await resendMailMutation.mutateAsync({ email });
        Message.success('Email sent successfully');
      } else {
        await verifyEmail(token);
      }
    } catch (error) {
      Message.error(error.message);
      userStore.actions.clearUserInfoAndToken();
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };
  const verifyEmail = async (t:string) => {
    setLoading(true);
    try {
      const res = await verifyMailMutation.mutateAsync({ token:t });
      if (res) {
        userInfo.isEmailVerified = true;
        const completeUserInfo = { ...userInfo };
        userStore.actions.setUserInfo(completeUserInfo as UserInfo);
        Message.success('Email verified successfully');
        router.replace(HOMEPAGE);
      }
    } catch (error) {
      Message.error(error.message);
      userStore.actions.clearUserInfoAndToken();
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Title level={2}>Verify your email address</Title>
        <Paragraph>
          We have sent a verification email to your email address <strong>{email}</strong>{' '}
        </Paragraph>
        <Paragraph>
          Please check your email and click the link in the email to verify your email address.
        </Paragraph>
        <Button type="primary" block onClick={onBtnClick} loading={loading}>
          {state === 'resend' ? 'Resend Email Verification' : 'Verify email'}
        </Button>
      </Card>
    </div>
  );
}

export default CheckEmail;
