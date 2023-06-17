import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EDIT_PROFILE,
  FETCH_MY_PROFILE,
  FETCH_RECRUITER_MY_PROFILE,
  FETCH_ORGANIZATION_MY_PROFILE,
  UPDATE_MY_PROFILE,
  UPDATE_ORGANIZATION_MY_PROFILE,
  UPDATE_RECRUITER_MY_PROFILE,
  FETCH_SUPPORT_TICKET,
  FETCH_SINGLE_SUPPORT_CHAT,
  SEND_SUPPORT_MESSAGE,
  CREATE_SUPPORT_TICKET,
  PRIVACY_SETTINGS_CHANGES,
  FETCH_OTHER_PROFILE,
  GET_PRIVACY_SETTINGS,
  FETCH_SUBSCRIPTION,
  FETCH_CARD,
  CREATE_NEW_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_DEFAULT_CARD,
  BUY_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FETCH_VIEW_NOTIFICATION,
  FETCH_NORMAL_NOTIFICATION,
  GET_CARD,
  GET_ALL_USER_LIST,
  DELETE_EDUCATION,
  BUY_SUBSCRIPTION_IOS,
  DELETE_WORK_INFO,
  GET_BLOCK_USER,
  GET_SUGGESTION_USER,
  CANCEL_SUGGESTION_USER,
  FOLLOW_LIST,
  FOLLOW_LIST_OTHER,
} from '../actions/profileAction';
import {
  fetchMyProfileService,
  fetchEditProfileService,
  fetchRecruiterMyProfileService,
  fetchOrganizationMyProfileService,
  updateMyProfileService,
  updateOrganizationMyProfileService,
  updateRecruiterMyProfileService,
  fetchAllSupportTicketsService,
  sendSupportMessageService,
  createSupportTicketService,
  fetchSingleSupportTicketChatService,
  privacySettingChangesService,
  fetchOtherProfileService,
  getUserPrivacySettingService,
  fetchSubscriptionsService,
  fetchCardsService,
  createNewCardService,
  updateCardService,
  deleteCardService,
  setDefaultCardService,
  cancelSubscriptionsService,
  buySubscriptionsService,
  followUserService,
  unfollowUserService,
  fetchNormalNotificationsService,
  fetchViewedNotificationsService,
  getCardService,
  fetchAllUserListService,
  educationDeleteService,
  buyIosSubscriptionsService,
  workInfoDeleteService,
  getBlockUserListService,
  getSuggestionUserListService,
  cancelSuggestionUserListService,
  fetchFollowListService,
} from '../services/profileService';

function* fetchMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(fetchMyProfileService, value);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchOtherProfileSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, userId } = params.payload;
    const response = yield call(fetchOtherProfileService, userId);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_OTHER_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_OTHER_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchRecruiterMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(fetchRecruiterMyProfileService, value);
    if (response && response.code === 200) {
      yield put({
        type: FETCH_RECRUITER_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_RECRUITER_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchOrganizationMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(fetchOrganizationMyProfileService, value);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_ORGANIZATION_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_ORGANIZATION_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* updateMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(updateMyProfileService, value);

    if (response && response.code === 200) {
      yield put({
        type: UPDATE_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: UPDATE_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response);
    }
  } catch (error) {
    payload.payload.onError(error?.response?.data);
  }
}

function* updateRecruiterMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(updateRecruiterMyProfileService, value);

    if (response && response.code === 200) {
      yield put({
        type: UPDATE_RECRUITER_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: UPDATE_RECRUITER_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* updateOrganizationMyProfile(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(updateOrganizationMyProfileService, value);

    if (response && response.code === 200) {
      yield put({
        type: UPDATE_ORGANIZATION_MY_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: UPDATE_ORGANIZATION_MY_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchEditProfile(payload) {
  try {
    const response = yield call(fetchEditProfileService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_EDIT_PROFILE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_EDIT_PROFILE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchAllSupportTicketsSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchAllSupportTicketsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_SUPPORT_TICKET.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_SUPPORT_TICKET.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchSubscriptonsSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchSubscriptionsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_SUBSCRIPTION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: FETCH_SUBSCRIPTION.FAILED,
        payload: response,
      });
      onError(response);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* buySubscriptonsSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, ...value } = param.payload;
    const response = yield call(buySubscriptionsService, value.data);

    if (response && response.code === 200) {
      yield put({
        type: BUY_SUBSCRIPTION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: BUY_SUBSCRIPTION.FAILED,
        payload: response,
      });
      onError(response);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* buySubscriptonsIOSSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, ...value } = param.payload;
    const response = yield call(buyIosSubscriptionsService, value.data);

    if (response && response.code === 200) {
      yield put({
        type: BUY_SUBSCRIPTION_IOS.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: BUY_SUBSCRIPTION_IOS.FAILED,
        payload: response,
      });
      onError(response);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* cancelSubscriptonsSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, ...value } = param.payload;
    const response = yield call(cancelSubscriptionsService, value.data);

    if (response && response.code === 200) {
      yield put({
        type: CANCEL_SUBSCRIPTION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: CANCEL_SUBSCRIPTION.FAILED,
        payload: response,
      });
      onError(response);
    }
  } catch (error) {
    payload.payload.onError(error);
  }
}

function* fetchCardsSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchCardsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: FETCH_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchNormalNotificationsSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchNormalNotificationsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_NORMAL_NOTIFICATION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: FETCH_NORMAL_NOTIFICATION.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchViewedNotificationsSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchViewedNotificationsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_VIEW_NOTIFICATION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: FETCH_VIEW_NOTIFICATION.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch (error) {
    payload.payload.onError(error.response.data);
  }
}
function* createNewCardSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(createNewCardService, params);

    if (response && response.code === 200) {
      yield put({
        type: CREATE_NEW_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: CREATE_NEW_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* getCardSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(getCardService, params);

    if (response && response.code === 200) {
      yield put({
        type: GET_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: GET_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch (error) {
    payload.payload.onError(error.response.data.message);
  }
}
function* updateCardSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(updateCardService, params);

    if (response && response.code === 200) {
      yield put({
        type: UPDATE_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: UPDATE_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deleteCardSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(deleteCardService, params);

    if (response && response.code === 200) {
      yield put({
        type: DELETE_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: DELETE_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* followUserSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(followUserService, params);

    if (response && response.code === 200) {
      yield put({
        type: FOLLOW_USER.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: FOLLOW_USER.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* unfollowUserSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(unfollowUserService, params);

    if (response && response.code === 200) {
      yield put({
        type: UNFOLLOW_USER.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: UNFOLLOW_USER.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* setDefaultCardSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(setDefaultCardService, params);

    if (response && response.code === 200) {
      yield put({
        type: SET_DEFAULT_CARD.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: SET_DEFAULT_CARD.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchSingleSupportTicketSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(fetchSingleSupportTicketChatService, param);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_SINGLE_SUPPORT_CHAT.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_SINGLE_SUPPORT_CHAT.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* createSupportTicketSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(createSupportTicketService, param);

    if (response && response.code === 200) {
      yield put({
        type: CREATE_SUPPORT_TICKET.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: CREATE_SUPPORT_TICKET.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* sendSupportMessageSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(sendSupportMessageService, param);

    if (response && response.code === 200) {
      yield put({
        type: SEND_SUPPORT_MESSAGE.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: SEND_SUPPORT_MESSAGE.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* privacySettingsChangesSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(privacySettingChangesService, param);

    if (response && response.code === 200) {
      yield put({
        type: PRIVACY_SETTINGS_CHANGES.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: PRIVACY_SETTINGS_CHANGES.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchPrivacySetting(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, ...value } = params.payload;
    const response = yield call(getUserPrivacySettingService, value);

    if (response && response.code === 200) {
      yield put({
        type: GET_PRIVACY_SETTINGS.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_PRIVACY_SETTINGS.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* getAllUserSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(fetchAllUserListService);

    if (response && response.code === 200) {
      yield put({
        type: GET_ALL_USER_LIST.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: GET_ALL_USER_LIST.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deleteEducationSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(educationDeleteService, param);

    if (response && response.code === 200) {
      yield put({
        type: DELETE_EDUCATION.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: DELETE_EDUCATION.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deleteWorkInfoSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(workInfoDeleteService, param);

    if (response && response.code === 200) {
      yield put({
        type: DELETE_WORK_INFO.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: DELETE_WORK_INFO.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* getBlockUserSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(getBlockUserListService);

    if (response && response.code === 200) {
      yield put({
        type: GET_BLOCK_USER.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: GET_BLOCK_USER.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* getSuggestionUserSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError } = params.payload;
    const response = yield call(getSuggestionUserListService);

    if (response && response.code === 200) {
      yield put({
        type: GET_SUGGESTION_USER.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: GET_SUGGESTION_USER.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* cancelSuggestionUserSaga(payload) {
  try {
    const params = payload;
    const { onSuccess, onError, param } = params.payload;
    const response = yield call(cancelSuggestionUserListService, param);

    if (response && response.code === 200) {
      yield put({
        type: CANCEL_SUGGESTION_USER.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: CANCEL_SUGGESTION_USER.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchFollowList(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(fetchFollowListService, params);

    if (response && response.code === 200) {
      yield put({
        type: FOLLOW_LIST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FOLLOW_LIST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchFollowListOther(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(fetchFollowListService, params);

    if (response && response.code === 200) {
      yield put({
        type: FOLLOW_LIST_OTHER.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FOLLOW_LIST_OTHER.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

export default function* profileSaga() {
  yield all([
    yield takeEvery(FETCH_MY_PROFILE.REQUEST, fetchMyProfile),
    yield takeEvery(FETCH_OTHER_PROFILE.REQUEST, fetchOtherProfileSaga),
    yield takeEvery(FETCH_SUBSCRIPTION.REQUEST, fetchSubscriptonsSaga),
    yield takeEvery(FETCH_CARD.REQUEST, fetchCardsSaga),
    yield takeEvery(CREATE_NEW_CARD.REQUEST, createNewCardSaga),
    yield takeEvery(GET_CARD.REQUEST, getCardSaga),
    yield takeEvery(UPDATE_CARD.REQUEST, updateCardSaga),
    yield takeEvery(DELETE_CARD.REQUEST, deleteCardSaga),
    yield takeEvery(SET_DEFAULT_CARD.REQUEST, setDefaultCardSaga),
    yield takeEvery(CANCEL_SUBSCRIPTION.REQUEST, cancelSubscriptonsSaga),
    yield takeEvery(BUY_SUBSCRIPTION.REQUEST, buySubscriptonsSaga),
    yield takeEvery(BUY_SUBSCRIPTION_IOS.REQUEST, buySubscriptonsIOSSaga),
    yield takeEvery(FOLLOW_USER.REQUEST, followUserSaga),
    yield takeEvery(UNFOLLOW_USER.REQUEST, unfollowUserSaga),
    yield takeEvery(
      FETCH_NORMAL_NOTIFICATION.REQUEST,
      fetchNormalNotificationsSaga
    ),
    yield takeEvery(
      FETCH_VIEW_NOTIFICATION.REQUEST,
      fetchViewedNotificationsSaga
    ),
  ]);
  yield all([
    yield takeEvery(
      FETCH_RECRUITER_MY_PROFILE.REQUEST,
      fetchRecruiterMyProfile
    ),
  ]);
  yield all([
    yield takeEvery(
      FETCH_ORGANIZATION_MY_PROFILE.REQUEST,
      fetchOrganizationMyProfile
    ),
  ]);
  yield all([yield takeEvery(UPDATE_MY_PROFILE.REQUEST, updateMyProfile)]);
  yield all([
    yield takeEvery(
      UPDATE_RECRUITER_MY_PROFILE.REQUEST,
      updateRecruiterMyProfile
    ),
  ]);
  yield all([
    yield takeEvery(
      UPDATE_ORGANIZATION_MY_PROFILE.REQUEST,
      updateOrganizationMyProfile
    ),
  ]);
  yield all([yield takeEvery(FETCH_EDIT_PROFILE.REQUEST, fetchEditProfile)]);
  yield all([
    yield takeEvery(FETCH_SUPPORT_TICKET.REQUEST, fetchAllSupportTicketsSaga),
    yield takeEvery(
      FETCH_SINGLE_SUPPORT_CHAT.REQUEST,
      fetchSingleSupportTicketSaga
    ),
    yield takeEvery(SEND_SUPPORT_MESSAGE.REQUEST, sendSupportMessageSaga),
    yield takeEvery(CREATE_SUPPORT_TICKET.REQUEST, createSupportTicketSaga),
    yield takeEvery(
      PRIVACY_SETTINGS_CHANGES.REQUEST,
      privacySettingsChangesSaga
    ),
    yield takeEvery(GET_PRIVACY_SETTINGS.REQUEST, fetchPrivacySetting),
    yield takeEvery(GET_ALL_USER_LIST.REQUEST, getAllUserSaga),
    yield takeEvery(DELETE_EDUCATION.REQUEST, deleteEducationSaga),
    yield takeEvery(DELETE_WORK_INFO.REQUEST, deleteWorkInfoSaga),
    yield takeEvery(GET_BLOCK_USER.REQUEST, getBlockUserSaga),
    yield takeEvery(GET_SUGGESTION_USER.REQUEST, getSuggestionUserSaga),
    yield takeEvery(CANCEL_SUGGESTION_USER.REQUEST, cancelSuggestionUserSaga),
    yield takeEvery(FOLLOW_LIST.REQUEST, fetchFollowList),
    yield takeEvery(FOLLOW_LIST_OTHER.REQUEST, fetchFollowListOther),
  ]);
}
