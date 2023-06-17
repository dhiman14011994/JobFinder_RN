import { putActions } from '../actionWrapper';

const LOADING = putActions('LOADING');
const FETCH_JOB = putActions('FETCH_JOB');
const FETCH_EVENTS = putActions('FETCH_EVENTS');
const EVENTS_SEARCHING = putActions('EVENTS_SEARCHING');
const JOBS_SEARCHING = putActions('JOBS_SEARCHING');
const FETCH_EVENT_BY_ID = putActions('FETCH_EVENT_BY_ID');
const FETCH_JOB_BY_ID = putActions('FETCH_JOB_BY_ID');
const FETCH_MYJOB = putActions('FETCH_MYJOB');

const FETCH_MYEVENT = putActions('FETCH_MYEVENT');
const APPLY_JOB = putActions('APPLY_JOB');
const HIDE_MY_JOB = putActions('HIDE_MY_JOB');
const ADD_TO_CALENDAR_EVENT = putActions('ADD_TO_CALENDAR_EVENT');
const APPLY_EVENT = putActions('APPLY_EVENT');
const SCHEDULE_INTERVIEW = putActions('SCHEDULE_INTERVIEW');
const GET_SCHEDULE_INTERVIEW = putActions('GET_SCHEDULE_INTERVIEW');
const DELETE_SCHEDULE_INTERVIEW = putActions('DELETE_SCHEDULE_INTERVIEW');

export {
  FETCH_JOB,
  LOADING,
  FETCH_EVENTS,
  FETCH_EVENT_BY_ID,
  FETCH_JOB_BY_ID,
  FETCH_MYJOB,
  FETCH_MYEVENT,
  HIDE_MY_JOB,
  ADD_TO_CALENDAR_EVENT,
  JOBS_SEARCHING,
  EVENTS_SEARCHING,
  APPLY_JOB,
  APPLY_EVENT,
  SCHEDULE_INTERVIEW,
  GET_SCHEDULE_INTERVIEW,
  DELETE_SCHEDULE_INTERVIEW,
};

export function setLoading(payload) {
  return { type: LOADING.REQUEST, payload: payload };
}

export function fetchJobs(payload) {
  return { type: FETCH_JOB.REQUEST, payload: payload };
}

export function fetchEvents(payload) {
  return { type: FETCH_EVENTS.REQUEST, payload: payload };
}

export function fetchEventById(payload) {
  return { type: FETCH_EVENT_BY_ID.REQUEST, payload: payload };
}

export function fetchJobById(payload) {
  return { type: FETCH_JOB_BY_ID.REQUEST, payload: payload };
}

export function fetchMyJobs(payload) {
  return { type: FETCH_MYJOB.REQUEST, payload: payload };
}
export function fetchMyEvents(payload) {
  return { type: FETCH_MYEVENT.REQUEST, payload: payload };
}

export function hideMyJob(payload) {
  return { type: HIDE_MY_JOB.REQUEST, payload: payload };
}
export function addEventToCalendar(payload) {
  return { type: ADD_TO_CALENDAR_EVENT.REQUEST, payload: payload };
}
export function onJobSearch(payload) {
  return { type: JOBS_SEARCHING.REQUEST, payload: payload };
}

export function onEventSearch(payload) {
  return { type: EVENTS_SEARCHING.REQUEST, payload: payload };
}
export function applyJobAction(payload) {
  return { type: APPLY_JOB.REQUEST, payload: payload };
}
export function applyEventAction(payload) {
  return { type: APPLY_EVENT.REQUEST, payload: payload };
}
export function scheduleInterviewAction(payload) {
  return { type: SCHEDULE_INTERVIEW.REQUEST, payload: payload };
}
export function getInterviewAction(payload) {
  return { type: GET_SCHEDULE_INTERVIEW.REQUEST, payload: payload };
}
export function deleteInterviewAction(payload) {
  return { type: DELETE_SCHEDULE_INTERVIEW.REQUEST, payload: payload };
}
