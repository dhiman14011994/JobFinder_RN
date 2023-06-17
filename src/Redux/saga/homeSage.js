import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  GET_CREATE_STORY,
  CREATE_STORY,
  UPLAOD_IMAGE,
  GET_STORY_BY_ID,
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  COMMENT_POST,
  HIDE_ALL_POST,
  HIDE_SINGLE_POST,
  BLOCK_USER,
  SEARCH_USER,
  INTERESTED_STORY_BY_USER,
  SHARE_POST,
  GET_POST_DETAILS,
  CREATE_POST_LOADING,
  DELETE_POST,
  GET_APP_VERSION,
  POST_APP_VERSION,
} from '../actions/homeAction';
import {
  fetchStories,
  createStory,
  uploadImage,
  getStoryById,
  createPost,
  fetchAllPosts,
  likePost,
  commentPost,
  hideAllPost,
  searchUserService,
  interestedStoryByUserService,
  sharePostApi,
  getPostDetailsService,
  blockUser,
  deletePostService,
  fetchAppVersions,
  postAppVersion,
} from '../services/homeService';

function* fetchUserStories(payload) {
  try {
    const response = yield call(fetchStories);

    if (response && response.code === 200) {
      yield put({
        type: GET_CREATE_STORY.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_CREATE_STORY.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* createStorySaga(payload) {
  try {
    let params = payload.payload.params;
    const response = yield call(createStory, params);

    if (response && response.code === 200) {
      yield put({
        type: CREATE_STORY.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: CREATE_STORY.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* getStoryByIdSaga(payload) {
  try {
    const response = yield call(getStoryById, payload.payload.id);

    if (response && response.code === 200) {
      yield put({
        type: GET_STORY_BY_ID.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_STORY_BY_ID.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* uploadImageSaga(payload) {
  try {
    let formData = new FormData();
    if (payload.payload.data.type === 'web') {
      formData.append('image[]', payload.payload.data.imagePath);
      const response = yield call(uploadImage, formData);

      if (response && response.code === 200) {
        yield put({
          type: UPLAOD_IMAGE.SUCCESS,
          payload: response,
        });
        payload.payload.onSuccess(response);
      } else {
        yield put({
          type: UPLAOD_IMAGE.FAILED,
          payload: response,
        });
        payload.payload.onError(response.message);
      }
    } else {
      let file = {
        uri: payload.payload.data.imagePath,
        type: 'multipart/form-data',
        name: 'image',
      };

      formData.append('image[]', file);

      const response = yield call(uploadImage, formData);

      if (response && response.code === 200) {
        yield put({
          type: UPLAOD_IMAGE.SUCCESS,
          payload: response,
        });
        payload.payload.onSuccess(response);
      } else {
        yield put({
          type: UPLAOD_IMAGE.FAILED,
          payload: response,
        });
        payload.payload.onError(response.message);
      }
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* createPostSaga(payload) {
  try {
    const response = yield call(createPost, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: CREATE_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
      yield put({
        type: CREATE_POST_LOADING.SUCCESS,
        payload: false,
      });
    } else {
      yield put({
        type: CREATE_POST.FAILED,
        payload: response,
      });
      yield put({
        type: CREATE_POST_LOADING.SUCCESS,
        payload: false,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    yield put({
      type: CREATE_POST_LOADING.SUCCESS,
      payload: false,
    });
    payload.payload.onError('error');
  }
}

function* fetchAllPostsSaga(payload) {
  try {
    const response = yield call(fetchAllPosts);

    if (response) {
      yield put({
        type: GET_ALL_POSTS.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_ALL_POSTS.FAILED,
        payload: response,
      });
      payload.payload.onSuccess({ data: [] });
      payload.payload.onError(response.message);
    }
  } catch (err) {
    payload.payload.onSuccess({ data: [] });
    payload.payload.onError(err);
  }
}

function* postAppVersionSaga(payload) {
  try {
    const response = yield call(postAppVersion, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: POST_APP_VERSION.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: POST_APP_VERSION.FAILED,
        payload: response,
      });

      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchAppVersionSaga(payload) {
  try {
    const response = yield call(fetchAppVersions);

    if (response && response.code === 200) {
      yield put({
        type: GET_APP_VERSION.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_APP_VERSION.FAILED,
        payload: response,
      });
      payload.payload.onSuccess({ data: [] });
      payload.payload.onError(response.message);
    }
  } catch (err) {
    payload.payload.onSuccess({ data: [] });
    payload.payload.onError(err);
  }
}
function* likePostSaga(payload) {
  try {
    let params = {
      post_id: payload.payload.post_id,
    };
    const response = yield call(likePost, params);
    if (response && response.code === 200) {
      yield put({
        type: LIKE_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: LIKE_POST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* commentPostSaga(payload) {
  try {
    const response = yield call(commentPost, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: COMMENT_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: COMMENT_POST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* hideAllPostSaga(payload) {
  try {
    const response = yield call(hideAllPost, payload.payload.params);
    if (response && response.code === 200) {
      yield put({
        type: HIDE_ALL_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: HIDE_ALL_POST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* blockUserSaga(payload) {
  try {
    const response = yield call(blockUser, payload.payload.params);
    if (response && response.code === 200) {
      yield put({
        type: BLOCK_USER.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: BLOCK_USER.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* sharePostSaga(payload) {
  try {
    let params = {
      post_id: payload.payload.post_id,
    };
    const response = yield call(sharePostApi, params);
    if (response && response.code === 200) {
      yield put({
        type: SHARE_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: SHARE_POST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* hideSinglePostSaga(payload) {
  try {
    const response = yield call(getStoryById, payload.payload.id);
    if (response && response.code === 200) {
      yield put({
        type: HIDE_SINGLE_POST.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: HIDE_SINGLE_POST.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* interestedStoryByUserSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(interestedStoryByUserService, params);
    if (response && response.code === 200) {
      yield put({
        type: INTERESTED_STORY_BY_USER.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: INTERESTED_STORY_BY_USER.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

// search user saga
function* searchUsersSaga(payload) {
  try {
    const response = yield call(searchUserService, payload.payload.keyword);
    if (response) {
      yield put({
        type: SEARCH_USER.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: SEARCH_USER.FAILED,
        payload: response,
      });
      yield put({
        type: SEARCH_USER.SUCCESS,
        payload: { data: [] },
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
    yield put({
      type: SEARCH_USER.SUCCESS,
      payload: { data: [] },
    });
  }
}

function* getPostDetailsSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(getPostDetailsService, param.payload._id);

    if (response && response.code === 200) {
      yield put({
        type: GET_POST_DETAILS.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: GET_POST_DETAILS.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deletePostSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;
    const response = yield call(deletePostService, param.payload._id);

    if (response && response.code === 200) {
      // yield put({
      //   type: GET_POST_DETAILS.SUCCESS,
      //   payload: response,
      // });
      payload.payload.onSuccess(response);
    } else {
      // yield put({
      //   type: GET_POST_DETAILS.FAILED,
      //   payload: response,
      // });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

export default function* homeSaga() {
  yield all([yield takeEvery(GET_CREATE_STORY.REQUEST, fetchUserStories)]);
  yield all([yield takeEvery(CREATE_STORY.REQUEST, createStorySaga)]);
  yield all([yield takeEvery(UPLAOD_IMAGE.REQUEST, uploadImageSaga)]);
  yield all([yield takeEvery(GET_STORY_BY_ID.REQUEST, getStoryByIdSaga)]);
  yield all([yield takeEvery(CREATE_POST.REQUEST, createPostSaga)]);
  yield all([yield takeEvery(GET_ALL_POSTS.REQUEST, fetchAllPostsSaga)]);
  yield all([yield takeEvery(LIKE_POST.REQUEST, likePostSaga)]);
  yield all([yield takeEvery(COMMENT_POST.REQUEST, commentPostSaga)]);
  yield all([yield takeEvery(HIDE_ALL_POST.REQUEST, hideAllPostSaga)]);
  yield all([yield takeEvery(BLOCK_USER.REQUEST, blockUserSaga)]);
  yield all([yield takeEvery(SHARE_POST.REQUEST, sharePostSaga)]);
  yield all([yield takeEvery(GET_POST_DETAILS.REQUEST, getPostDetailsSaga)]);
  yield all([yield takeEvery(GET_APP_VERSION.REQUEST, fetchAppVersionSaga)]);
  yield all([yield takeEvery(POST_APP_VERSION.REQUEST, postAppVersionSaga)]);
  yield all([
    yield takeEvery(HIDE_SINGLE_POST.REQUEST, hideSinglePostSaga),
    yield takeEvery(SEARCH_USER.REQUEST, searchUsersSaga),
    yield takeEvery(
      INTERESTED_STORY_BY_USER.REQUEST,
      interestedStoryByUserSaga
    ),
  ]);
  yield all([yield takeEvery(DELETE_POST.REQUEST, deletePostSaga)]);
}
