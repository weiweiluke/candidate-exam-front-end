import { useRive, Layout as LayoutRive, Fit, Alignment } from '@rive-app/react-canvas';
import { Layout, Typography } from 'antd';
import Color from 'color';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import Overlay2 from '@/assets/images/background/overlay_2.jpg';
import LocalePicker from '@/components/locale-picker';
import { useUserToken } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import LoginForm from './LoginForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
  const u = useRive({
    src: 'guangdong-beach.riv',
    // TODO: Set stateMachines
    autoplay: true,
    layout: new LayoutRive({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const { t } = useTranslation();
  const token = useUserToken();
  const { colorBgElevated } = useThemeToken();

  // Check if the user has a token
  if (token.accessToken) {
    // If the user has a token, redirect to the homepage
    return <Navigate to={HOMEPAGE} replace />;
  }

  const gradientBg = Color(colorBgElevated).alpha(0.9).toString();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay2})`;

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={{
          background: bg,
        }}
      >
        <div className="absolute top-32 text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          Home Exam for Full-Stack Developer
        </div>
        <u.RiveComponent />
        <Typography.Text className="absolute bottom-24 flex flex-row gap-[16px] text-2xl text-gray-400">
          {t('sys.login.signInSecondTitle')}
        </Typography.Text>
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm /> 
          <RegisterForm /> 
          <ResetForm /> 
        </LoginStateProvider>
      </div>

      <div className="absolute right-2 top-0">
        <LocalePicker /> 
      </div>
    </Layout>
  );
}

export default Login;
