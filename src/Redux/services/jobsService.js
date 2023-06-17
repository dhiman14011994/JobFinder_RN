import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';

const createJobPost = params =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_job}`, params, config)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            if (error?.response?.data) {
              console.log('error?.response?.data', error?.response?.data);
              resolve(error?.response?.data);
            } else {
              reject(
                error?.response?.data ? error?.response?.data : error?.response,
              );
              console.log(JSON.stringify(error));
            }
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const createEventPost = params =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_event}`, params, config)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            if (error?.response?.data) {
              console.log('error?.response?.data', error?.response?.data);
              resolve(error?.response?.data);
            } else {
              reject(
                error?.response?.data ? error?.response?.data : error?.response,
              );
              console.log('error?.response?.data', error?.response?.data);
              console.log(JSON.stringify(error));
            }
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });


const detletJobById = params =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
      try {
        console.log("MYtoken",value)
        console.log("MYtoken",params)
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.delete_job_by_id}?job_id=${params.job_id}`, config)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            if (error?.response?.data) {
              console.log('error?.response?.data', error?.response?.data);
              resolve(error?.response?.data);
            } else {
              reject(
                error?.response?.data ? error?.response?.data : error?.response,
              );
              console.log(JSON.stringify(error));
            }
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });



  const deleteEventById = params =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
      try {
        console.log("MYtoken",value)
        console.log("MYtoken",params)
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.delete_event_by_id}?event_id=${params.event_id}`, config)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            if (error?.response?.data) {
              console.log('error?.response?.data', error?.response?.data);
              resolve(error?.response?.data);
            } else {
              reject(
                error?.response?.data ? error?.response?.data : error?.response,
              );
              console.log(JSON.stringify(error));
            }
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

export { createJobPost, createEventPost , detletJobById, deleteEventById};
