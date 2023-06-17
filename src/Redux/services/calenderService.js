/* eslint-disable no-new */
import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import toast from 'react-simple-toasts';

// Post Method

const getCalenderEvents = params =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params,
        },
      };
      Network.get(`${EndPoint.Get_Event_Calender}`, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response,
            );
            // toast(error?.response?.data);
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const deleteCalenderEvents = params =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      console.log(
        'url',
        `${EndPoint.Event_delete}${params.id}`,
        'token>>>>',
        params.token,
      );
      Network.get(`${EndPoint.Event_delete}${params.id}`, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response,
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

export {getCalenderEvents, deleteCalenderEvents};
