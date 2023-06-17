import {
  LOADING,
  LOGIN,
  SOCIAL_LOGIN,
  REGISTER,
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
} from '../actions/authAction';

const initialState = {
  isLoading: false,
  registerData: null,
  loginData: null,
  socialLoginData: null,
  sendOtpData: null,
  verifyOtpData: null,
  resetPasswordData: null,
  changePasswordData: null,
  token: null,
  userType: '',
  userData: null,
  emailData: '',
  isNotification: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER.SUCCESS:
      return {
        ...state,
        registerData: action.payload,
        userData: action.payload,
        token: action.payload.access_token,
      };
    case REGISTER.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        userData: action.payload,
        token: action.payload.access_token,
      };
    case LOGIN.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case SOCIAL_LOGIN.SUCCESS:
      return {
        ...state,
        socialLoginData: action.payload,
        userData: action.payload,
        token: action.payload.access_token,
      };
    case SOCIAL_LOGIN.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LINKDIN_LOGIN.SUCCESS:
      return {
        ...state,
        socialLoginData: action.payload,
        userData: action.payload,
        token: action.payload.access_token,
      };
    case LINKDIN_LOGIN.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case SEND_OTP.SUCCESS:
      return { ...state, sendOtpData: action };
    case VERIFY_OTP.SUCCESS:
      return { ...state, verifyOtpData: action };
    case RESET_PASSWORD.SUCCESS:
      return { ...state, resetPasswordData: action };
    case CHANGE_PASSWORD.SUCCESS:
      return { ...state, changePasswordData: action };
    case SEND_OTP.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_OTP.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_PASSWORD.FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOADING.SUCCESS:
      return {
        ...state,
        isLoading: initialState.isLoading ? true : action.payload,
      };
    case USER_TYPE.SUCCESS:
      return { ...state, userType: action.payload };
    case AUTH_TOKEN.SUCCESS:
      return { ...state, token: action.payload };
    case USER_DATA.SUCCESS:
      return { ...state, userData: action.payload };
    case EMAILCHECK.SUCCESS:
      return { ...state, emailData: action.payload };
    case EMAILCHECK.FAILED:
      return { ...state, emailData: action.payload };
    case IS_NOTIFICATION.SUCCESS:
      return { ...state, isNotification: action.payload };
    case RESET.SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
