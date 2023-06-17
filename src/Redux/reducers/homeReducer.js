import { RESET } from '../actions/authAction';
import {
  LOADING,
  GET_CREATE_STORY,
  GET_STORY_BY_ID,
  CREATE_POST,
  LIKE_POST,
  GET_ALL_POSTS,
  COMMENT_POST,
  HIDE_ALL_POST,
  HIDE_SINGLE_POST,
  SEARCH_USER,
  SHARE_POST,
  GET_POST_DETAILS,
  BLOCK_USER,
  CREATE_POST_LOADING,
  SUBSCRIPTION_MODAL,
} from '../actions/homeAction';

const initialState = {
  isLoading: false,
  stories: [{}],
  storyData: undefined,
  posts: [{}, {}, {}],
  searchedUser: [],
  shareData: {},
  postDetails: {},
  postLoading: false,
  isSubscriptionModal: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.SUCCESS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_CREATE_STORY.SUCCESS:
      return {
        ...state,
        stories: [{}, ...action.payload.data],
      };
    case GET_STORY_BY_ID.SUCCESS:
      return {
        ...state,
        storyData: action.payload.data,
      };
    case GET_ALL_POSTS.SUCCESS:
      return {
        ...state,
        posts: [{}, {}, {}, ...action.payload.data],
      };
    case SEARCH_USER.SUCCESS:
      return {
        ...state,
        searchedUser: action.payload.data,
      };
    case SHARE_POST.SUCCESS:
      return {
        ...state,
        shareData: action.payload.data,
      };
    case GET_POST_DETAILS.SUCCESS:
      return {
        ...state,
        postDetails: action.payload.data[0],
      };
    case CREATE_POST_LOADING.SUCCESS:
      return {
        ...state,
        postLoading: action.payload,
      };
    case SUBSCRIPTION_MODAL.SUCCESS:
      return {
          ...state,
          isSubscriptionModal: action.payload,
        };
    case RESET.SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
