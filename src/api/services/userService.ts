import apiClient from '../apiClient';

import { UserInfo, UserToken } from '#/entity';

/**
 * Represents the request object for signing in.
 */
export interface SignInReq {
  email: string;
  password: string;
}

/**
 * Represents the request object for signing up a user.
 * Inherits properties from the SignInReq interface.
 * @template T - The type of the email property.
 * @property {T} email - The email of the user.
 */
export interface SignUpReq extends SignInReq {
  email: string;
}

/**
 * Represents the response object for signing in.
 * @typedef {UserToken & { user: UserInfo }} SignInRes
 */
export type SignInRes = UserToken & { user: UserInfo };

/**
 * Enum representing the API endpoints for user-related operations.
 */
export enum UserApi {
  SignIn = '/users/signin',
  SignUp = '/users/signup',
  GoogleSignIn = '/auth/google-auth',
  GoogleSignInUrl = '/auth/get-google-auth-url',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  User = '/user',
  ResendMail = '/auth/resend-email',
  VerifyMail = '/auth/verify-email',
  modifyPassword = '/users/modify-password',
  modifyProfile = '/users/modify-profile',
}

/**
 * Signs in a user.
 *
 * @param data - The sign-in request data.
 * @returns A promise that resolves to the sign-in response.
 */
const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
/**
 * Signs up a user.
 *
 * @param data - The sign up request data.
 * @returns A promise that resolves to the sign in response.
 */
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
/**
 * Performs a Google sign-in using the provided access token.
 *
 * @param data - The data object containing the access token.
 * @returns A promise that resolves to the sign-in response.
 */
const googleSignIn = (data: { accessToken: string }) =>
  apiClient.post<SignInRes>({ url: UserApi.GoogleSignIn, data });
/**
 * Logs out the user.
 */
const logout = () => apiClient.get({ url: UserApi.Logout });

/**
 * Retrieves the Google authentication URL.
 *
 * @returns {Promise<{ url: string }>} The Google authentication URL.
 */
const getGoogleAuthUrl = () => apiClient.get<{ url: string }>({ url: UserApi.GoogleSignInUrl });
/**
 * Resends a mail to the specified email address.
 *
 * @param data - The data object containing the email address.
 */
const resendMail = (data: { email: string }) => apiClient.post({ url: UserApi.ResendMail, data });
/**
 * Verifies the user's email using the provided token.
 *
 * @param data - The data object containing the token.
 * @returns A Promise that resolves when the email is successfully verified.
 */
const verifyMail = (data: { token: string }) => apiClient.post({ url: UserApi.VerifyMail, data });
/**
 * Modifies the user's password.
 *
 * @param data - An object containing the old password and the new password.
 * @param data.oldPassword - The user's current password.
 * @param data.newPassword - The new password to be set.
 * @returns A promise that resolves when the password is successfully modified.
 */
const modifyPassword = (data: { oldPassword: string; newPassword: string }) =>
  apiClient.put({ url: UserApi.modifyPassword, data });
/**
 * Modifies the user's profile.
 *
 * @param data - The data object containing the user's first name and last name.
 * @returns A Promise that resolves to the modified profile.
 */
const modifyProfile = (data: { firstName: string; lastName: string }) =>
  apiClient.put({ url: UserApi.modifyProfile, data });

export default {
  signin,
  signup,
  logout,
  googleSignIn,
  getGoogleAuthUrl,
  resendMail,
  verifyMail,
  modifyProfile,
  modifyPassword,
};
