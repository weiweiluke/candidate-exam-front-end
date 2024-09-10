import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useModifyProfile = () => {
  const { message } = App.useApp();
  const { setUserInfo } = useUserActions();

  const modifyProfileMutation = useMutation({
    mutationFn: userService.modifyProfile,
  });

  const modifyProfile = async (data: { firstName: string; lastName: string }) => {
    const res = await modifyProfileMutation.mutateAsync(data);
    setUserInfo(res);
    message.success({
      content: 'Profile modified successfully',
      duration: 3,
    });
  };
  return modifyProfile;
};
export const useModifyPassword = () => {
  const { message } = App.useApp();

  const modifyPasswordMutation = useMutation({
    mutationFn: userService.modifyPassword,
  });

  const modifyPassword = async (data: { oldPassword: string; newPassword: string }) => {
    await modifyPasswordMutation.mutateAsync(data);
    message.success({
      content: 'Password modified successfully',
      duration: 3,
    });
  };

  return modifyPassword;
};
export const useSignIn = () => {
  const navigatge = useNavigate();
  const { message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  return signIn;
};

export const useGoogleSignIn = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const googleSignInMutation = useMutation({ mutationFn: userService.googleSignIn });
  const googleSignIn = async (data: any) => {
    try {
      const res = await googleSignInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigate(HOMEPAGE, { replace: true });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };
  return googleSignIn;
};

export const openGoogleAuthUrl = () => {
  const getGoogleAuthUrlMtation = useMutation({ mutationFn: userService.getGoogleAuthUrl });

  const openGoogleAuthUrl = async () => {
    const res = await getGoogleAuthUrlMtation.mutateAsync();
    const { url } = res;
    window.location.href = url;
  };

  return openGoogleAuthUrl;
};
export default useUserStore;
