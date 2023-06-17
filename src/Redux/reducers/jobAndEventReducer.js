import { RESET } from '../actions/authAction';
import {
  LOADING,
  FETCH_EVENTS,
  FETCH_JOB,
  FETCH_JOB_BY_ID,
  FETCH_MYJOB,
  FETCH_MYEVENT,
  FETCH_EVENT_BY_ID,
  EVENTS_SEARCHING,
  JOBS_SEARCHING,
  APPLY_EVENT,
  SCHEDULE_INTERVIEW,
  GET_SCHEDULE_INTERVIEW,
} from '../actions/jobAndEventAction';

const initialState = {
  isLoading: false,
  jobs: [],
  events: [],
  jobDetail: null,
  eventDetail: null,
  myJobs: [],
  myEvents: [],
  searchedJobs: [],
  searchedEvents: [],
  eventData: {},
  interviewData: {},
  interviews: [],
};

const jobAndEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.SUCCESS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_EVENTS.SUCCESS:
      return {
        ...state,
        events: action.payload.data,
      };
    case FETCH_JOB.SUCCESS:
      return {
        ...state,
        jobs: action.payload.data,
      };
    case FETCH_JOB_BY_ID.SUCCESS:
      return {
        ...state,
        jobDetail: action.payload.data,
      };
    case FETCH_EVENT_BY_ID.SUCCESS:
      return {
        ...state,
        eventDetail: action.payload.data,
      };
    case FETCH_MYJOB.SUCCESS:
      return {
        ...state,
        myJobs: action.payload.data,
      };
    case FETCH_MYEVENT.SUCCESS:
      return {
        ...state,
        myEvents: action.payload.data,
      };
    case APPLY_EVENT.SUCCESS:
      return {
        ...state,
        eventData: action.payload.data,
      };

    case SCHEDULE_INTERVIEW.SUCCESS:
      return {
        ...state,
        interviewData: action.payload.data,
      };
    case GET_SCHEDULE_INTERVIEW:
      return {
        ...state,
        interviews: action.payload.data,
      };
    case EVENTS_SEARCHING.REQUEST:
      let searchedEvents = state.jobs?.Featured_Jobs.filter((item) => {
        return (
          item?.event_title?.includes(action.payload.text) ||
          item?.job_description?.includes(action.payload.text)
        );
      });

      return {
        ...state,
        searchedEvents,
      };
    case JOBS_SEARCHING.REQUEST:
      let searchedJobs = state.jobs?.Featured_Jobs.filter((item) => {
        return (
          item?.job_title?.includes(action.payload.text) ||
          item?.job_description?.includes(action.payload.text)
        );
      });

      return {
        ...state,
        searchedJobs,
      };
    case RESET.SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default jobAndEventReducer;
