/* eslint-disable no-new */
import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';
import axios from 'axios';

// Post Metho
const imageUplaod = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + params.token,
        },
      };
      var form = new FormData();
      form.append('image[]', params.file);

      Network.post(`${EndPoint.imageUpload}`, form, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(
            error?.response?.data ? error?.response?.data : error?.response
          );
        });
    } catch (error) {
      reject(error);
    }
  });

const fetchMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.get(`${EndPoint.pro_profile}`, config)
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

const fetchOtherProfileService = (id) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_other_user}?user_id=${id}`, config)
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
  });

const fetchRecruiterMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };

      Network.get(`${EndPoint.rec_profile}`, config)
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

const fetchOrganizationMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.get(`${EndPoint.org_profile}`, config)
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

const updateMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.put(
        `${EndPoint.edit_professional}${params.id}`,
        params.data,
        config
      )
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

const updateRecruiterMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.put(`${EndPoint.edit_recruiter}${params.id}`, params.data, config)
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

const updateOrganizationMyProfileService = (params) =>
  new Promise((resolve, reject) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + params.token,
        },
      };
      Network.put(
        `${EndPoint.edit_organization}${params.id}`,
        params.data,
        config
      )
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

const fetchEditProfileService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.edit_profile}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });

const fetchAllSupportTicketsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_user_support}`, config)
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
  });
const fetchSubscriptionsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.getsubscription}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });

const buySubscriptionsService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_subscription}`, params, config)
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
  });
const buyIosSubscriptionsService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.ios_create_subscription}`, params, config)
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
  });

const cancelSubscriptionsService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.cancel_subscription}`, params, config)
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
  });

const fetchCardsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_cards}`, config)
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
  });

const fetchViewedNotificationsService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.profile_view_notifications}`, config)
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
  });

const fetchNormalNotificationsService = () =>
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
          `${EndPoint.get_notification}?admin_notification=admin`,
          config
        )
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
  });
const createNewCardService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_new_card}`, params, config)
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
  });

const getCardService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`,
          },
        };
        Network.get(
          `${EndPoint.get_card}?card_id=${params.card_id}&customer_id=${params.customer_id}`,
          config
        )
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
  });

const updateCardService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.put(`${EndPoint.update_card}`, params, config)
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
  });

const setDefaultCardService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.set_card_default}`, params, config)
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
  });

const deleteCardService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.get(`${EndPoint.delete_card}${params}`, config)
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
  });

const followUserService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.follow_user}`, params, config)
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
  });

const unfollowUserService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.unfollow_user}`, params, config)
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
  });

const fetchSingleSupportTicketChatService = (param) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        const id = param.supportID;
        Network.get(
          `${EndPoint.get_user_support_record}?supportID=${id}`,
          config
        )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });

const sendSupportMessageService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.send_support_message}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });

const privacySettingChangesService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.update_privacy_setting}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });
const createSupportTicketService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.createSupport}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });

const getUserPrivacySettingService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_privacy_setting}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {}
    });
  });

const sendPushNotificationService = (params) =>
  new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        data: params,
        headers: {
          Authorization:
            'key=AAAAsfWDpA4:APA91bGBldnQHWPfMU2x6bsKunMHBhDhD8Vl7f9zGrhDmsLpaQ3MwCLArLY838KTVRfYZm907s9m0LCYczkq1Fwbg8JAWeJqZ0htZjWdMvPm_Nu5kYlJx2UVg8t5e4aS0P9MqR-J7x1c',
        },
      })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (response) {
          reject(response);
        });
    } catch (error) {
      reject(error);
    }
  });

const getLinkdinAccessTokenService = (params) =>
  new Promise((resolve, reject) => {
    try {
      var qs = require('qs');
      var data = qs.stringify({
        grant_type: 'authorization_code',
        code: params.code,
        client_id: '86oqhtj40bpw96',
        client_secret: 'bxHb0Bfn27HCzm6A',
        redirect_uri: 'http://localhost:3000/linkedIn',
      });
      var config = {
        method: 'post',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie:
            'bcookie="v=2&97f2aa80-f312-4c4d-8f81-48be1655a31c"; lang=v=2&lang=en-us; lidc="b=VB29:s=V:r=V:a=V:p=V:g=4172:u=854:x=1:i=1669278776:t=1669332907:v=2:sig=AQEWXn4sPjWGYsiqhWV8hCCfL7kOOzhv"; bscookie="v=1&20220718124010cef7fecf-9b1b-44a4-8f57-50d8bcccea74AQEIzmooL6xQXCjCPusjrdD-HxJ1qsNL"',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
          //handle success
        })
        .catch(function (response) {
          reject(response);
        });
    } catch (error) {
      reject(error);
    }
  });

const fetchAllUserListService = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.all_connections}`, config)
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
  });

const educationDeleteService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.post(`${EndPoint.deleteEducation}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });

const workInfoDeleteService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.deleteWorkInfo}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });

const getBlockUserListService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.GET_BLOCK}`, config)
          .then((response) => {
            console.log('response.data>>>', response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });

const getSuggestionUserListService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.GET_SUGGESTION}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });
const cancelSuggestionUserListService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.CANCEL_SUGGESTION}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  });

const fetchFollowListService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };

        Network.get(`${EndPoint.FOLLOW_LIST}${params}`, config)
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
  });

export {
  imageUplaod,
  fetchMyProfileService,
  fetchEditProfileService,
  fetchRecruiterMyProfileService,
  fetchOrganizationMyProfileService,
  updateMyProfileService,
  updateRecruiterMyProfileService,
  updateOrganizationMyProfileService,
  fetchAllSupportTicketsService,
  fetchSingleSupportTicketChatService,
  sendSupportMessageService,
  createSupportTicketService,
  privacySettingChangesService,
  fetchOtherProfileService,
  getUserPrivacySettingService,
  fetchSubscriptionsService,
  fetchCardsService,
  createNewCardService,
  updateCardService,
  deleteCardService,
  setDefaultCardService,
  buySubscriptionsService,
  cancelSubscriptionsService,
  followUserService,
  unfollowUserService,
  fetchNormalNotificationsService,
  fetchViewedNotificationsService,
  sendPushNotificationService,
  getCardService,
  getLinkdinAccessTokenService,
  fetchAllUserListService,
  educationDeleteService,
  buyIosSubscriptionsService,
  workInfoDeleteService,
  getBlockUserListService,
  getSuggestionUserListService,
  cancelSuggestionUserListService,
  fetchFollowListService,
};
