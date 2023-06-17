/* eslint-disable no-new */
import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import toast from 'react-simple-toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';

// Post Method

const signUp = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      Network.post(`${EndPoint.signUp}`, params.form, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            console.log('error', error?.response);
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log('error', error?.response);
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      reject(error);
      console.log('Error>>>>', error);
    }
  });

const login = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.post(`${EndPoint.login}`, params, config)
        .then((response) => {
          console.log('response?.data>>>', response);
          resolve(response?.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log('error?.response?.data>>>', error);
            console.log('error?.response?.data', error?.response?.data);
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const sendOtp = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.post(`${EndPoint.sendOtp}`, params.data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const verifyOtp = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.post(`${EndPoint.verifyOtp}`, params.data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const resetPassword = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.post(`${EndPoint.resetPassword}`, params, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const changePassword = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.post(`${EndPoint.changePassword}`, params, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      toast('Something went wrong.');
      console.log(error);
    }
  });

const socialLogin = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.post(`${EndPoint.socialLogin}`, params, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );

            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

const forgotPassword = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.post(EndPoint.forgotPassword, params, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      console.log(error);
    }
  });
const updatePassword = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.post(EndPoint.changePassword, params.data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );

            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

const emailCheck = (params) => {
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.post(EndPoint.checkEmail, params, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const socialLinkdinLogin = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      Network.get(
        `${EndPoint.linkedinAuth}?token=${params.token}&role=${params.role}&device_token=${params.device_token}`,
        config
      )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error?.response?.data) {
            resolve(error?.response?.data);
          } else {
            reject(
              error?.response?.data ? error?.response?.data : error?.response
            );
            console.log(JSON.stringify(error));
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

const deleteUserAccount = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.delete(EndPoint.deleteAccount, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log('err1', error.response);
            reject(error);
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const logout = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(EndPoint.SIGN_OUT, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log('err1', error.response);
            reject(error);
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

export {
  signUp,
  login,
  socialLogin,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword,
  forgotPassword,
  emailCheck,
  logout,
  updatePassword,
  socialLinkdinLogin,
  deleteUserAccount,
};
