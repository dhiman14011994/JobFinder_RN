import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';

const fetchJobService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_all_jobs}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const fetchEventService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_all_events}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const fetchJobByIDService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_job_by_id}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });
const fetchEventByIDService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        console.log('fetchJobByIDService', params);
        Network.get(`${EndPoint.get_event_by_id}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const fetchMyJobsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.get(`${EndPoint.get_my_jobs}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const fetchMyEventsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.get(`${EndPoint.get_my_events}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const disableMyJobService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.post(`${EndPoint.hide_user_jobs}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });
const addEventToCalendarService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.post(`${EndPoint.event_calender}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const applyJobService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.post(`${EndPoint.apply_jobs}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('fetchStoriesErr>>>>', error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log('fetchStoriesErr>>>>', error);
        console.log(error);
      }
    });
  });

const applyEventService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.post(`${EndPoint.apply_event}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data || error);
            console.log('fetchStoriesErr>>>>', error.response.data);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error?.response?.data || error);
        console.log('fetchStoriesErr>>>>', error?.response?.data || error);
      }
    });
  });
const interviewScheduleService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.scheduleInterview}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data || error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error?.response?.data || error);
        console.log('fetchStoriesErr>>>>', error?.response?.data || error);
      }
    });
  });

const getInterviewService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.getScheduledInterviews}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data || error);
            console.log('fetchStoriesErr>>>>', error.response.data);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error?.response?.data || error);
        console.log('fetchStoriesErr>>>>', error?.response?.data || error);
      }
    });
  });

const deleteInterviewService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(
          `${EndPoint.deleteInterview}?interview_id=${params}`,
          config
        )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data || error);
            console.log('deleteErr>>>>', error.response.data);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error?.response?.data || error);
        console.log('deleteErr>>>>', error?.response?.data || error);
      }
    });
  });

export {
  fetchEventService,
  fetchJobService,
  fetchJobByIDService,
  fetchMyJobsService,
  fetchMyEventsService,
  disableMyJobService,
  fetchEventByIDService,
  addEventToCalendarService,
  applyJobService,
  applyEventService,
  interviewScheduleService,
  getInterviewService,
  deleteInterviewService,
};
