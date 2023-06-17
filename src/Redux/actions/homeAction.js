import { putActions } from '../actionWrapper';

const LOADING = putActions('LOADING');
const GET_CREATE_STORY = putActions('GET_CREATE_STORY');
const CREATE_STORY = putActions('CREATE_STORY');
const UPLAOD_IMAGE = putActions('UPLAOD_IMAGE');
const GET_STORY_BY_ID = putActions('GET_STORY_BY_ID');
const CREATE_POST_LOADING = putActions('CREATE_POST_LOADING');

// Feeds/POST

const CREATE_POST = putActions('CREATE_POST');
const GET_ALL_POSTS = putActions('GET_ALL_POSTS');
const LIKE_POST = putActions('LIKE_POST');
const COMMENT_POST = putActions('COMMENT_POST');
const HIDE_SINGLE_POST = putActions('HIDE_SINGLE_POST');
const HIDE_ALL_POST = putActions('HIDE_ALL_POST');
const SEARCH_USER = putActions('SEARCH_USER');
const INTERESTED_STORY_BY_USER = putActions('INTERESTED_STORY_BY_USER');
const SHARE_POST = putActions('SHARE_POST');
const GET_POST_DETAILS = putActions('GET_POST_DETAILS');
const BLOCK_USER = putActions('BLOCK-USER');
const DELETE_POST = putActions('DELETE_POST');
const GET_APP_VERSION = putActions('GET_APP_VERSION');
const POST_APP_VERSION = putActions('POST_APP_VERSION');
const SUBSCRIPTION_MODAL = putActions('POST_APP_VERSION');
export {
  GET_CREATE_STORY,
  LOADING,
  CREATE_STORY,
  UPLAOD_IMAGE,
  GET_STORY_BY_ID,
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  COMMENT_POST,
  HIDE_ALL_POST,
  HIDE_SINGLE_POST,
  SEARCH_USER,
  INTERESTED_STORY_BY_USER,
  SHARE_POST,
  GET_POST_DETAILS,
  BLOCK_USER,
  CREATE_POST_LOADING,
  DELETE_POST,
  GET_APP_VERSION,
  POST_APP_VERSION,
  SUBSCRIPTION_MODAL,
};

export function fetchStories(payload) {
  return { type: GET_CREATE_STORY.REQUEST, payload: payload };
}

export function uploadImage(payload) {
  return { type: UPLAOD_IMAGE.REQUEST, payload: payload };
}

export function createStory(payload) {
  return { type: CREATE_STORY.REQUEST, payload: payload };
}

export function getStoryByID(payload) {
  return { type: GET_STORY_BY_ID.REQUEST, payload: payload };
}

export function createPost(payload) {
  return { type: CREATE_POST.REQUEST, payload: payload };
}

export function fetchAllPosts(payload) {
  return { type: GET_ALL_POSTS.REQUEST, payload: payload };
}
export function fetchAppVersionAction(payload) {
  return { type: GET_APP_VERSION.REQUEST, payload: payload };
}
export function addAppVersionAction(payload) {
  return { type: POST_APP_VERSION.REQUEST, payload: payload };
}
export function likePost(payload) {
  return { type: LIKE_POST.REQUEST, payload: payload };
}

export function commentPost(payload) {
  return { type: COMMENT_POST.REQUEST, payload: payload };
}

export function hideAllPost(payload) {
  return { type: HIDE_ALL_POST.REQUEST, payload: payload };
}

export function blockuser(payload) {
  return { type: BLOCK_USER.REQUEST, payload: payload };
}

export function hideSinglePost(payload) {
  return { type: HIDE_SINGLE_POST.REQUEST, payload: payload };
}
export function searchUserAction(payload) {
  return { type: SEARCH_USER.REQUEST, payload: payload };
}
export function searchAction(payload) {
  return { type: SEARCH_USER.SUCCESS, payload: payload };
}
export function interestedInStoryAction(payload) {
  return { type: INTERESTED_STORY_BY_USER.REQUEST, payload: payload };
}
export function sharePost(payload) {
  return { type: SHARE_POST.REQUEST, payload: payload };
}
export function getPostDetails(payload) {
  return { type: GET_POST_DETAILS.REQUEST, payload: payload };
}
export function setCreatePostLoading(payload) {
  return { type: CREATE_POST_LOADING.SUCCESS, payload: payload };
}
export function deletePostAction(payload) {
  return { type: DELETE_POST.REQUEST, payload: payload };
}

export function setSubscriptionModalAction(payload){
  return { type: SUBSCRIPTION_MODAL.SUCCESS, payload: payload}
}