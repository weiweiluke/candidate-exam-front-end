import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserInfo, useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();
  const { isEmailVerified } = useUserInfo();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
    if (isEmailVerified === false) {
      router.replace('/checkemail');
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
