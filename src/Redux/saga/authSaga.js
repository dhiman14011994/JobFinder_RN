import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  REGISTER,
  LOGIN,
  SEND_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  SOCIAL_LOGIN,
  EMAILCHECK,
  LINKDIN_LOGIN,
  DELETE_ACCOUNT,
  LOGOUT_ACCOUNT,
} from '../actions/authAction';
import {
  signUp,
  login,
  socialLogin,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword,
  emailCheck,
  socialLinkdinLogin,
  deleteUserAccount,
  logout,
} from '../services/authService';

function* signup(payload) {
  const params = payload;
  const { onSuccess, onError, ...value } = params.payload;
  try {
    const response = yield call(signUp, value);
    if (response && response.code == 200) {
      yield put({
        type: REGISTER.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: REGISTER.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* emailcheck(payload) {
  const params = payload;
  const { onSuccess, onError, ...value } = params.payload;
  try {
    const response = yield call(emailCheck, value.from);
    if (response && response.code == 200) {
      yield put({
        type: EMAILCHECK.SUCCESS,
        payload: response,
      });
      console.log('payload.payload', response);
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: EMAILCHECK.FAILED,
        payload: response,
      });
      console.log('payload.payloaderror', response);
      payload.payload.onError(response);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* loginCall(payload) {
  console.log('loginCall==== response', payload);
  const params = payload.payload.data;
  try {
    const response = yield call(login, params);
    console.log('loginCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: LOGIN.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      // alert('error');
      console.log('error>>response', response);
      yield put({
        type: LOGIN.FAILED,
        payload: response,
      });
      payload.payload.onError(response);
    }
  } catch (error) {
    payload.payload.onError(error?.response?.data || error);
  }
}

function* socialLoginCall(payload) {
  const params = payload.payload.data;
  try {
    const response = yield call(socialLogin, params);
    console.log('socialLoginCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: SOCIAL_LOGIN.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: SOCIAL_LOGIN.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* linkdinLoginCall(payload) {
  const params = payload.payload.data;
  try {
    const response = yield call(socialLinkdinLogin, params);
    console.log('socialLoginCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: LINKDIN_LOGIN.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: LINKDIN_LOGIN.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* sendOtpCall(payload) {
  const params = payload.payload.data;
  try {
    console.log('sendOtpCall==== data', params);
    const response = yield call(sendOtp, params);
    console.log('sendOtpCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: SEND_OTP.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: SEND_OTP.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* verifyOtpCall(payload) {
  const params = payload.payload.data;
  try {
    console.log('verifyOtpCall==== data', params);
    const response = yield call(verifyOtp, params);
    console.log('verifyOtpCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: VERIFY_OTP.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: VERIFY_OTP.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* resetPasswordCall(payload) {
  const params = payload.payload.data;
  try {
    console.log('resetPasswordCall==== data', params);
    const response = yield call(resetPassword, params);
    console.log('resetPasswordCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: RESET_PASSWORD.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: RESET_PASSWORD.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* changePasswordCall(payload) {
  const params = payload.payload.data;
  try {
    console.log('changePasswordCall==== data', params);
    const response = yield call(changePassword, params);
    console.log('changePasswordCall==== response', response);

    if (response && response.code == 200) {
      yield put({
        type: CHANGE_PASSWORD.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: CHANGE_PASSWORD.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deleteAccountCall(payload) {
  const params = payload.payload.data;
  try {
    const response = yield call(deleteUserAccount, params);

    if (response && response.code == 200) {
      payload.payload.onSuccess(response);
    } else {
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* logoutAccountCall(payload) {
  const params = payload.payload.data;
  try {
    const response = yield call(logout, params);

    if (response && response.code == 200) {
      payload.payload.onSuccess(response);
    } else {
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(REGISTER.REQUEST, signup),
    yield takeEvery(LOGIN.REQUEST, loginCall),
    yield takeEvery(SOCIAL_LOGIN.REQUEST, socialLoginCall),
    yield takeEvery(SEND_OTP.REQUEST, sendOtpCall),
    yield takeEvery(VERIFY_OTP.REQUEST, verifyOtpCall),
    yield takeEvery(RESET_PASSWORD.REQUEST, resetPasswordCall),
    yield takeEvery(CHANGE_PASSWORD.REQUEST, changePasswordCall),
    yield takeEvery(EMAILCHECK.REQUEST, emailcheck),
    yield takeEvery(LINKDIN_LOGIN.REQUEST, linkdinLoginCall),
    yield takeEvery(DELETE_ACCOUNT.REQUEST, deleteAccountCall),
    yield takeEvery(LOGOUT_ACCOUNT.REQUEST, logoutAccountCall),
  ]);
}
