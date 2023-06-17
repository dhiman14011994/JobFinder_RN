import { putActions } from '../actionWrapper';

const LOADING = putActions('LOADING');
const LOGIN = putActions('LOGIN');
const SOCIAL_LOGIN = putActions('SOCIAL_LOGIN');
const REGISTER = putActions('REGISTER');
const EMAILCHECK = putActions('EMAILCHECK');
const SEND_OTP = putActions('SEND_OTP');
const VERIFY_OTP = putActions('VERIFY_OTP');
const RESET_PASSWORD = putActions('RESET_PASSWORD');
const CHANGE_PASSWORD = putActions('CHANGE_PASSWORD');
const USER_TYPE = putActions('USER_TYPE');
const AUTH_TOKEN = putActions('AUTH_TOKEN');
const USER_DATA = putActions('USER_DATA');
const RESET = putActions('RESET');
const LINKDIN_LOGIN = putActions('LINKDIN_LOGIN');
const IS_NOTIFICATION = putActions('IS_NOTIFICATION');
const DELETE_ACCOUNT = putActions('DELETE_ACCOUNT');
const LOGOUT_ACCOUNT = putActions('LOGOUT_ACCOUNT');
export {
  LOGIN,
  SOCIAL_LOGIN,
  REGISTER,
  LOADING,
  SEND_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  USER_TYPE,
  AUTH_TOKEN,
  USER_DATA,
  RESET,
  EMAILCHECK,
  LINKDIN_LOGIN,
  IS_NOTIFICATION,
  DELETE_ACCOUNT,
  LOGOUT_ACCOUNT,
};

export function signUp(payload) {
  return { type: REGISTER.REQUEST, payload: payload };
}
export function emailVaildation(payload) {
  return { type: EMAILCHECK.REQUEST, payload: payload };
}

export function login(payload) {
  return { type: LOGIN.REQUEST, payload: payload };
}

export function socialLogin(payload) {
  return { type: SOCIAL_LOGIN.REQUEST, payload: payload };
}
export function sendOtp(payload) {
  return { type: SEND_OTP.REQUEST, payload: payload };
}

export function verifyOtp(payload) {
  return { type: VERIFY_OTP.REQUEST, payload: payload };
}

export function resetPassword(payload) {
  return { type: RESET_PASSWORD.REQUEST, payload: payload };
}

export function changePassword(payload) {
  return { type: CHANGE_PASSWORD.REQUEST, payload: payload };
}

export function setLoading(payload) {
  return { type: LOADING.SUCCESS, payload: payload };
}
export function setUserType(payload) {
  return { type: USER_TYPE.SUCCESS, payload: payload };
}
export function setToken(payload) {
  return { type: AUTH_TOKEN.SUCCESS, payload: payload };
}
export function setUserData(payload) {
  return { type: USER_DATA.SUCCESS, payload: payload };
}
export function reset(payload) {
  return { type: RESET.SUCCESS, payload: payload };
}
export function linkdinLogin(payload) {
  return { type: LINKDIN_LOGIN.REQUEST, payload: payload };
}
export function setIsNotification(payload) {
  return { type: IS_NOTIFICATION.SUCCESS, payload: payload };
}
export function deleteUserAccount(payload) {
  return { type: DELETE_ACCOUNT.REQUEST, payload: payload };
}
export function logoutUserAccount(payload) {
  return { type: LOGOUT_ACCOUNT.REQUEST, payload: payload };
}
