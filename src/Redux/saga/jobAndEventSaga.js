import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EVENTS,
  FETCH_JOB,
  FETCH_JOB_BY_ID,
  FETCH_MYJOB,
  FETCH_MYEVENT,
  HIDE_MY_JOB,
  FETCH_EVENT_BY_ID,
  ADD_TO_CALENDAR_EVENT,
  APPLY_JOB,
  APPLY_EVENT,
  SCHEDULE_INTERVIEW,
  GET_SCHEDULE_INTERVIEW,
  DELETE_SCHEDULE_INTERVIEW,
} from '../actions/jobAndEventAction';
import {
  addEventToCalendarService,
  applyEventService,
  applyJobService,
  deleteInterviewService,
  disableMyJobService,
  fetchEventByIDService,
  fetchEventService,
  fetchJobByIDService,
  fetchJobService,
  fetchMyEventsService,
  fetchMyJobsService,
  getInterviewService,
  interviewScheduleService,
} from '../services/jobAndEventService';

function* fetchJobs(payload) {
  try {
    const response = yield call(fetchJobService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_JOB.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_JOB.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchEvents(payload) {
  try {
    const response = yield call(fetchEventService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_EVENTS.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_EVENTS.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchJobByIdSaga(payload) {
  try {
    const response = yield call(fetchJobByIDService, payload.payload.eventId);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_JOB_BY_ID.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_JOB_BY_ID.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchEventByIdSaga(payload) {
  try {
    const response = yield call(fetchEventByIDService, payload.payload.eventId);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_EVENT_BY_ID.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_EVENT_BY_ID.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* fetchMyJobSaga(payload) {
  try {
    const response = yield call(fetchMyJobsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_MYJOB.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_MYJOB.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* fetchMyEventsSaga(payload) {
  try {
    const response = yield call(fetchMyEventsService);

    if (response && response.code === 200) {
      yield put({
        type: FETCH_MYEVENT.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: FETCH_MYEVENT.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* disableMyJobSaga(payload) {
  try {
    const response = yield call(disableMyJobService, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: HIDE_MY_JOB.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: HIDE_MY_JOB.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* addEventToCalendarSaga(payload) {
  try {
    const response = yield call(
      addEventToCalendarService,
      payload.payload.params
    );

    if (response && response.code === 200) {
      yield put({
        type: ADD_TO_CALENDAR_EVENT.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: ADD_TO_CALENDAR_EVENT.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* applyJobSaga(payload) {
  try {
    const response = yield call(applyJobService, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: APPLY_JOB.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      yield put({
        type: APPLY_JOB.FAILED,
        payload: response,
      });
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* applyEventSaga(payload) {
  try {
    const response = yield call(applyEventService, payload.payload.params);

    if (response && response.code === 200) {
      yield put({
        type: APPLY_EVENT.SUCCESS,
        payload: response,
      });
      payload.payload.onSuccess(response);
    } else {
      payload.payload.onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}
function* interviewScheduleSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;

    const response = yield call(interviewScheduleService, params);

    if (response && response.code === 200) {
      yield put({
        type: SCHEDULE_INTERVIEW.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: SCHEDULE_INTERVIEW.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* getInterviewSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;

    const response = yield call(getInterviewService, params);

    if (response && response.code === 200) {
      yield put({
        type: GET_SCHEDULE_INTERVIEW.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: GET_SCHEDULE_INTERVIEW.FAILED,
        payload: response,
      });
      onError(response.message);
    }
  } catch {
    payload.payload.onError('error');
  }
}

function* deleteInterviewSaga(payload) {
  try {
    const param = payload;
    const { onSuccess, onError, params } = param.payload;

    const response = yield call(deleteInterviewService, params);

    if (response && response.code === 200) {
      yield put({
        type: DELETE_SCHEDULE_INTERVIEW.SUCCESS,
        payload: response,
      });
      onSuccess(response);
    } else {
      yield put({
        type: DELETE_SCHEDULE_INTERVIEW.FAILED,
        payload: response,
      });
      onError(response);
    }
  } catch (error) {
    payload.payload.onError(error);
  }
}
export default function* jobAndEventSaga() {
  yield all([yield takeEvery(FETCH_EVENTS.REQUEST, fetchEvents)]);
  yield all([yield takeEvery(FETCH_JOB.REQUEST, fetchJobs)]);
  yield all([yield takeEvery(FETCH_JOB_BY_ID.REQUEST, fetchJobByIdSaga)]);
  yield all([yield takeEvery(FETCH_MYJOB.REQUEST, fetchMyJobSaga)]);
  yield all([yield takeEvery(FETCH_MYEVENT.REQUEST, fetchMyEventsSaga)]);
  yield all([yield takeEvery(HIDE_MY_JOB.REQUEST, disableMyJobSaga)]);
  yield all([yield takeEvery(FETCH_EVENT_BY_ID.REQUEST, fetchEventByIdSaga)]);
  yield all([yield takeEvery(APPLY_JOB.REQUEST, applyJobSaga)]);
  yield all([yield takeEvery(APPLY_EVENT.REQUEST, applyEventSaga)]);
  yield all([
    yield takeEvery(ADD_TO_CALENDAR_EVENT.REQUEST, addEventToCalendarSaga),
  ]);
  yield all([
    yield takeEvery(SCHEDULE_INTERVIEW.REQUEST, interviewScheduleSaga),
  ]);
  yield all([
    yield takeEvery(GET_SCHEDULE_INTERVIEW.REQUEST, getInterviewSaga),
  ]);
  yield all([
    yield takeEvery(DELETE_SCHEDULE_INTERVIEW.REQUEST, deleteInterviewSaga),
  ]);
}
