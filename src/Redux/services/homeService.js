import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';

const fetchStories = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_stories_professional}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const createStory = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_story_professional}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });
const getStoryById = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_story_by_id}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const createPost = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.create_post}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const interestedStoryByUserService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.interested_story}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const fetchAllPosts = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.get_posts}`, config)
          .then((response) => {
            console.log('post>>>> response service', response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
            console.log(JSON.stringify(error.response.data));
          });
      } catch (error) {
        reject(error);
        console.log('fetchAllPosts>>>>', error.response.data);
        console.log(error.response.data);
      }
    });
  });

const postAppVersion = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.POST_VERSION}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });
const fetchAppVersions = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.GET_VERSION}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
            console.log(JSON.stringify(error.response.data));
          });
      } catch (error) {
        reject(error);

        console.log(error.response.data);
      }
    });
  });
// const searchUserService = params =>
//   new Promise((resolve, reject) => {
//     AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
//       try {
//         let config = {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + value,
//           },
//         };
//         Network.get(`${EndPoint.search_users}?keyword=${params}`, config)
//           .then(response => {
//             resolve(response.data);
//           })
//           .catch(error => {
//             reject(error);
//             console.log(JSON.stringify(error));
//           });
//       } catch (error) {
//         reject(error);
//         console.log(error);
//       }
//     });
//   });
const likePost = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.like_post}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('likePost11>>>>', error?.response?.data);
          });
      } catch (error) {
        reject(error);
        console.log('likePost22>>>>', error?.response);
      }
    });
  });

const commentPost = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.add_comment}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const hideAllPost = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.hide_post}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const hideSinglePost = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.hide_post}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const blockUser = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.block_user}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const sharePostApi = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        console.log('params new data>>>', params);
        Network.post(`${EndPoint.share}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log('share11>>>>', error?.response?.data);
          });
      } catch (error) {
        reject(error);
        console.log('share22>>>>', error?.response);
      }
    });
  });
const uploadImage = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.post(`${EndPoint.upload_image}`, params, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });
// searchuserService
const searchUserService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        Network.get(`${EndPoint.search_users}?keyword=${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const getPostDetailsService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        console.log('params>>>', params);
        Network.get(`${EndPoint.getpostbyid}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

const deletePostService = (params) =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        };
        console.log('params>>>', params);
        Network.delete(`${EndPoint.POST}${params}`, config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  });

export {
  fetchStories,
  createStory,
  uploadImage,
  getStoryById,
  createPost,
  fetchAllPosts,
  likePost,
  commentPost,
  hideAllPost,
  hideSinglePost,
  searchUserService,
  interestedStoryByUserService,
  sharePostApi,
  getPostDetailsService,
  blockUser,
  deletePostService,
  fetchAppVersions,
  postAppVersion,
};
