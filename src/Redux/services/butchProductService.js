import Network from '../../constants/Network';
import endpoint from '../../constants/EndPoint';

export const getButcherAllOrder = async data => {
  let headers = {
    Authorization: data != '' ? 'Bearer ' + data : '',
    Accept: 'application/json',
  };

  return await new Promise(async function (resolve, reject) {
    Network.get(
      `${endpoint.baseURL}${endpoint.butcher}${endpoint.orders}/${endpoint.list}`,
      {headers},
    )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const getButcherProducts = async data => {
  let headers = {
    Authorization: data != '' ? 'Bearer ' + data : '',
    Accept: 'application/json',
  };

  return await new Promise(async function (resolve, reject) {
    Network.get(
      `${endpoint.baseURL}${endpoint.butcher}${endpoint.products}/${endpoint.list}`,
      {headers},
    )
      .then(response => {
        resolve(response.data);
        console.log('response>>>>', response.data);
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const addButcherProducts = async data => {
  let headers = {
    Authorization: data?.token != '' ? 'Bearer ' + data?.token : '',
    'Content-Type': 'multipart/form-data',
  };

  return await new Promise(async function (resolve, reject) {
    Network.post(
      `${endpoint.baseURL}${endpoint.butcher}${endpoint.products}/${endpoint.store}`,
      data.data,
      {headers},
    )
      .then(response => {
        console.log('response', response);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};
