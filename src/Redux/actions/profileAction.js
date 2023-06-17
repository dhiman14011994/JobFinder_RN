import { putActions } from '../actionWrapper';

const LOADING = putActions('LOADING');
const FETCH_MY_PROFILE = putActions('FETCH_MY_PROFILE');
const FETCH_OTHER_PROFILE = putActions('FETCH_OTHER_PROFILE');
const FETCH_RECRUITER_MY_PROFILE = putActions('FETCH_RECRUITER_MY_PROFILE');
const FETCH_ORGANIZATION_MY_PROFILE = putActions(
  'FETCH_ORGANIZATION_MY_PROFILE'
);
const UPDATE_MY_PROFILE = putActions('UPDATE_MY_PROFILE');
const UPDATE_RECRUITER_MY_PROFILE = putActions('UPDATE_RECRUITER_MY_PROFILE');
const UPDATE_ORGANIZATION_MY_PROFILE = putActions(
  'UPDATE_ORGANIZATION_MY_PROFILE'
);
const FETCH_EDIT_PROFILE = putActions('FETCH_EDIT_PROFILE');
const PROFILE_DATA = putActions('PROFILE_DATA');

const FETCH_SUPPORT_TICKET = putActions('FETCH_SUPPORT_TICKET');
const FETCH_SINGLE_SUPPORT_CHAT = putActions('FETCH_SINGLE_SUPPORT_CHAT');

const SEND_SUPPORT_MESSAGE = putActions('SEND_SUPPORT_MESSAGE');
const CREATE_SUPPORT_TICKET = putActions('CREATE_SUPPORT_TICKET');
const PRIVACY_SETTINGS_CHANGES = putActions('PRIVACY_SETTINGS_CHANGES');
const GET_PRIVACY_SETTINGS = putActions('GET_PRIVACY_SETTINGS');
const SAVE_TERM_CONDITION = putActions('SAVE_TERM_CONDITION');
const FETCH_SUBSCRIPTION = putActions('FETCH_SUBSCRIPTION');
const BUY_SUBSCRIPTION = putActions('BUY_SUBSCRIPTION');
const BUY_SUBSCRIPTION_IOS = putActions('BUY_SUBSCRIPTION_IOS');
const CANCEL_SUBSCRIPTION = putActions('CANCEL_SUBSCRIPTION');
const FETCH_CARD = putActions('FETCH_CARD');
const CREATE_NEW_CARD = putActions('CREATE_NEW_CARD');
const GET_CARD = putActions('GET_CARD');
const UPDATE_CARD = putActions('UPDATE_CARD');
const SET_DEFAULT_CARD = putActions('SET_DEFAULT_CARD');
const DELETE_CARD = putActions('DELETE_CARD');
const FOLLOW_USER = putActions('FOLLOW_USER');
const UNFOLLOW_USER = putActions('UNFOLLOW_USER');
const FETCH_NORMAL_NOTIFICATION = putActions('FETCH_NORMAL_NOTIFICATION');
const FETCH_VIEW_NOTIFICATION = putActions('FETCH_VIEW_NOTIFICATION');
const IS_CHAT_DETAILS = putActions('IS_CHAT_DETAILS');
const DIRECT_CHAT_DETAILS = putActions('DIRECT_CHAT_DETAILS');
const COMPANY_CHAT_DETAILS = putActions('COMPANY_CHAT_DETAILS');
const NOTIFICATION_CHAT_DETAILS = putActions('NOTIFICATION_CHAT_DETAILS');
const SELECTED_CHAT_DETAILS = putActions('SELECTED_CHAT_DETAILS');
const GET_ALL_USER_LIST = putActions('GET_ALL_USER_LIST');
const DELETE_EDUCATION = putActions('DELETE_EDUCATION');
const DELETE_WORK_INFO = putActions('DELETE_WORK_INFO');
const GET_BLOCK_USER = putActions('GET_BLOCK_USER');
const GET_SUGGESTION_USER = putActions('GET_SUGGESTION_USER');
const CANCEL_SUGGESTION_USER = putActions('CANCEL_SUGGESTION_USER');
const FOLLOW_LIST = putActions('FOLLOW_LIST');
const FOLLOW_LIST_OTHER = putActions('FOLLOW_LIST_OTHER');
export {
  FETCH_MY_PROFILE,
  LOADING,
  FETCH_EDIT_PROFILE,
  FETCH_RECRUITER_MY_PROFILE,
  FETCH_ORGANIZATION_MY_PROFILE,
  UPDATE_MY_PROFILE,
  UPDATE_RECRUITER_MY_PROFILE,
  UPDATE_ORGANIZATION_MY_PROFILE,
  PROFILE_DATA,
  FETCH_SUPPORT_TICKET,
  SEND_SUPPORT_MESSAGE,
  CREATE_SUPPORT_TICKET,
  FETCH_SINGLE_SUPPORT_CHAT,
  PRIVACY_SETTINGS_CHANGES,
  FETCH_OTHER_PROFILE,
  GET_PRIVACY_SETTINGS,
  SAVE_TERM_CONDITION,
  FETCH_SUBSCRIPTION,
  FETCH_CARD,
  CREATE_NEW_CARD,
  UPDATE_CARD,
  SET_DEFAULT_CARD,
  DELETE_CARD,
  BUY_SUBSCRIPTION,
  BUY_SUBSCRIPTION_IOS,
  CANCEL_SUBSCRIPTION,
  UNFOLLOW_USER,
  FOLLOW_USER,
  FETCH_NORMAL_NOTIFICATION,
  FETCH_VIEW_NOTIFICATION,
  GET_CARD,
  IS_CHAT_DETAILS,
  DIRECT_CHAT_DETAILS,
  COMPANY_CHAT_DETAILS,
  NOTIFICATION_CHAT_DETAILS,
  SELECTED_CHAT_DETAILS,
  GET_ALL_USER_LIST,
  DELETE_EDUCATION,
  DELETE_WORK_INFO,
  GET_BLOCK_USER,
  GET_SUGGESTION_USER,
  CANCEL_SUGGESTION_USER,
  FOLLOW_LIST,
  FOLLOW_LIST_OTHER,
};

export function setLoading(payload) {
  return { type: LOADING.REQUEST, payload: payload };
}

export function fetchMyProfile(payload) {
  return { type: FETCH_MY_PROFILE.REQUEST, payload: payload };
}
export function fetchOtherProfile(payload) {
  return { type: FETCH_OTHER_PROFILE.REQUEST, payload: payload };
}

export function fetchRecruiterMyProfile(payload) {
  return { type: FETCH_RECRUITER_MY_PROFILE.REQUEST, payload: payload };
}

export function fetchOrganizationMyProfile(payload) {
  return { type: FETCH_ORGANIZATION_MY_PROFILE.REQUEST, payload: payload };
}

export function fetchEditProfile(payload) {
  return { type: FETCH_EDIT_PROFILE.REQUEST, payload: payload };
}
export function updateMyProfile(payload) {
  return { type: UPDATE_MY_PROFILE.REQUEST, payload: payload };
}

export function updateRecruiterMyProfile(payload) {
  return { type: UPDATE_RECRUITER_MY_PROFILE.REQUEST, payload: payload };
}

export function updateOrganizationMyProfile(payload) {
  return { type: UPDATE_ORGANIZATION_MY_PROFILE.REQUEST, payload: payload };
}
export function setProfileData(payload) {
  return { type: PROFILE_DATA.SUCCESS, payload: payload };
}

export function fetchAllSupportTicket(payload) {
  return { type: FETCH_SUPPORT_TICKET.REQUEST, payload: payload };
}

export function fetchSingleSupportTicketChat(payload) {
  return { type: FETCH_SINGLE_SUPPORT_CHAT.REQUEST, payload: payload };
}

export function sendMessageSupport(payload) {
  return { type: SEND_SUPPORT_MESSAGE.REQUEST, payload: payload };
}

export function createSupportTicket(payload) {
  return { type: CREATE_SUPPORT_TICKET.REQUEST, payload: payload };
}
export function privacySettingChanges(payload) {
  return { type: PRIVACY_SETTINGS_CHANGES.REQUEST, payload: payload };
}

export function getPrivacySetting(payload) {
  return { type: GET_PRIVACY_SETTINGS.REQUEST, payload: payload };
}
export function setTermCondition(payload) {
  return { type: SAVE_TERM_CONDITION.SUCCESS, payload: payload };
}
export function fetchSubscriptions(payload) {
  return { type: FETCH_SUBSCRIPTION.REQUEST, payload: payload };
}
export function buySubscriptions(payload) {
  return { type: BUY_SUBSCRIPTION.REQUEST, payload: payload };
}
export function buySubscriptionsIos(payload) {
  return { type: BUY_SUBSCRIPTION_IOS.REQUEST, payload: payload };
}

export function cancelSubscriptions(payload) {
  return { type: CANCEL_SUBSCRIPTION.REQUEST, payload: payload };
}
export function fetchCardAction(payload) {
  return { type: FETCH_CARD.REQUEST, payload: payload };
}
export function createNewCardAction(payload) {
  return { type: CREATE_NEW_CARD.REQUEST, payload: payload };
}
export function getCardAction(payload) {
  return { type: GET_CARD.REQUEST, payload: payload };
}
export function updateCardAction(payload) {
  return { type: UPDATE_CARD.REQUEST, payload: payload };
}
export function deleteCardAction(payload) {
  return { type: DELETE_CARD.REQUEST, payload: payload };
}
export function setDefaultCardAction(payload) {
  return { type: SET_DEFAULT_CARD.REQUEST, payload: payload };
}
export function followUserAction(payload) {
  return { type: FOLLOW_USER.REQUEST, payload: payload };
}
export function unFollowUserAction(payload) {
  return { type: UNFOLLOW_USER.REQUEST, payload: payload };
}
export function fetchNormalNotificationAction(payload) {
  return { type: FETCH_NORMAL_NOTIFICATION.REQUEST, payload: payload };
}
export function fetchViewedNotificationAction(payload) {
  return { type: FETCH_VIEW_NOTIFICATION.REQUEST, payload: payload };
}
export function isChatDetails(payload) {
  return { type: IS_CHAT_DETAILS.SUCCESS, payload: payload };
}
export function DirectChatDetails(payload) {
  return { type: DIRECT_CHAT_DETAILS.SUCCESS, payload: payload };
}
export function CompanyChatDetails(payload) {
  return { type: COMPANY_CHAT_DETAILS.SUCCESS, payload: payload };
}
export function NotificationChatDetails(payload) {
  return { type: NOTIFICATION_CHAT_DETAILS.SUCCESS, payload: payload };
}
export function SelectChatDetails(payload) {
  return { type: SELECTED_CHAT_DETAILS.SUCCESS, payload: payload };
}
export function getAllUserList(payload) {
  return { type: GET_ALL_USER_LIST.REQUEST, payload: payload };
}
export function deleteEducationData(payload) {
  return { type: DELETE_EDUCATION.REQUEST, payload: payload };
}
export function deleteWorkInfoData(payload) {
  return { type: DELETE_WORK_INFO.REQUEST, payload: payload };
}
export function getBlockUserDataAction(payload) {
  return { type: GET_BLOCK_USER.REQUEST, payload: payload };
}
export function setBlockUserDataAction(payload) {
  return { type: GET_BLOCK_USER.SUCCESS, payload: payload };
}
export function getSuggestionUserAction(payload) {
  return { type: GET_SUGGESTION_USER.REQUEST, payload: payload };
}
export function SetSuggestionUserAction(payload) {
  return { type: GET_SUGGESTION_USER.SUCCESS, payload: payload };
}
export function cancelSuggestionUserAction(payload) {
  return { type: CANCEL_SUGGESTION_USER.REQUEST, payload: payload };
}

export function fetchFollowList(payload) {
  return { type: FOLLOW_LIST.REQUEST, payload: payload };
}
export function fetchFollowListOther(payload) {
  return { type: FOLLOW_LIST_OTHER.REQUEST, payload: payload };
}
