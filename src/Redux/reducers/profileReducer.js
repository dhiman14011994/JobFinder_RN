import { RESET } from '../actions/authAction';
import {
  LOADING,
  FETCH_MY_PROFILE,
  FETCH_RECRUITER_MY_PROFILE,
  FETCH_ORGANIZATION_MY_PROFILE,
  FETCH_EDIT_PROFILE,
  UPDATE_MY_PROFILE,
  UPDATE_ORGANIZATION_MY_PROFILE,
  UPDATE_RECRUITER_MY_PROFILE,
  PROFILE_DATA,
  FETCH_SUPPORT_TICKET,
  FETCH_SINGLE_SUPPORT_CHAT,
  FETCH_OTHER_PROFILE,
  GET_PRIVACY_SETTINGS,
  SAVE_TERM_CONDITION,
  FETCH_SUBSCRIPTION,
  FETCH_CARD,
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
  FOLLOW_LIST,
  FOLLOW_LIST_OTHER,
} from '../actions/profileAction';

const initialState = {
  isLoading: false,
  myProfile: [],
  editProfile: [],
  supportTickets: [],
  ticketDetails: null,
  privacySetting: null,
  termCondition: false,
  subscriptionList: [],
  cardList: [],
  normalNotifications: [],
  viewedNotifications: [],
  cardData: null,
  isChatDetails: false,
  directChat: [],
  companyChat: [],
  notificationChat: [],
  userChatDetails: {},
  allUser: [],
  educationDelete: {},
  workInfoDelete: {},
  blockUserData: [],
  suggestionList: [],
  followList: [],
  followListOther: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.SUCCESS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case FETCH_RECRUITER_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case FETCH_ORGANIZATION_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case FETCH_EDIT_PROFILE.SUCCESS:
      return {
        ...state,
        editProfile: action.payload.data,
      };
    case UPDATE_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case UPDATE_RECRUITER_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case UPDATE_ORGANIZATION_MY_PROFILE.SUCCESS:
      return {
        ...state,
        myProfile: action.payload.data,
      };
    case PROFILE_DATA.SUCCESS:
      return { ...state, myProfile: action.payload };
    case FETCH_SUPPORT_TICKET.SUCCESS:
      return { ...state, supportTickets: action.payload.data };
    case FETCH_OTHER_PROFILE.SUCCESS:
      return { ...state, otherUserProfile: action.payload.data };
    case FETCH_SINGLE_SUPPORT_CHAT.SUCCESS:
      return { ...state, ticketDetails: action.payload.data };
    case RESET.SUCCESS:
      return initialState;
    case GET_PRIVACY_SETTINGS.SUCCESS:
      return { ...state, privacySetting: action.payload.data };
    case SAVE_TERM_CONDITION.SUCCESS:
      return { ...state, termCondition: action.payload };
    case FETCH_SUBSCRIPTION.SUCCESS:
      return { ...state, subscriptionList: action.payload.data };
    case FETCH_CARD.SUCCESS:
      return { ...state, cardList: action.payload.data };
    case FETCH_NORMAL_NOTIFICATION.SUCCESS:
      return { ...state, normalNotifications: action.payload.data };
    case FETCH_VIEW_NOTIFICATION.SUCCESS:
      return { ...state, viewedNotifications: action.payload.data.reverse() };
    case GET_CARD.SUCCESS:
      return { ...state, cardData: action.payload.data };
    case IS_CHAT_DETAILS.SUCCESS:
      return { ...state, isChatDetails: action.payload };
    case DIRECT_CHAT_DETAILS.SUCCESS:
      return { ...state, directChat: action.payload };
    case COMPANY_CHAT_DETAILS.SUCCESS:
      return { ...state, companyChat: action.payload };
    case NOTIFICATION_CHAT_DETAILS.SUCCESS:
      return { ...state, notificationChat: action.payload };
    case SELECTED_CHAT_DETAILS.SUCCESS:
      return { ...state, userChatDetails: action.payload };
    case GET_ALL_USER_LIST.SUCCESS:
      return { ...state, allUser: action.payload.data };
    case DELETE_EDUCATION.SUCCESS:
      return { ...state, educationDelete: action.payload.data };
    case DELETE_WORK_INFO.SUCCESS:
      return { ...state, workInfoDelete: action.payload.data };
    case GET_BLOCK_USER.SUCCESS:
      return { ...state, blockUserData: action.payload.data };
    case GET_SUGGESTION_USER.SUCCESS:
      return { ...state, suggestionList: [...action.payload.data] };
    case FOLLOW_LIST.SUCCESS:
      return {
        ...state,
        followList: action?.payload?.data || action?.payload?.message,
      };
    case FOLLOW_LIST_OTHER.SUCCESS:
      return {
        ...state,
        followListOther: action?.payload?.data || action?.payload?.message,
      };

    default:
      return state;
  }
};

export default profileReducer;
