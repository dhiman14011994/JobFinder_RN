import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

function allUsersList() {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Participant')
      .get()
      .then(
        (response) => {
          const listData = [];
          response.docs.forEach((doc) => {
            listData.push(doc.data());
          });
          resolve(listData);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

const setFirebaseUserData = ({ id, userData }) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .set(userData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('responseerror>>>', error);
        reject(error);
      });
  });
};
const getFirebaseUserData = ({ id }) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const setFirebaseChatList = ({ id, userData, chatUserId }) => {
  return new Promise((resolve, reject) => {
    try {
      const userSetList = firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .add(userData);
      resolve(userSetList);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteFirebaseChatList = ({ id, chatUserId }) => {
  return new Promise((resolve, reject) => {
    try {
      const userSetList = firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (response) => {
            // resolve(response.docs);
            response.docs.forEach((doc) => {
              if (doc._data.id == chatUserId) {
                console.log('doc.>>', doc);
              }
            });
            resolve(listUserData);
          },
          (error) => {
            reject(error);
          }
        );
      // resolve(userSetList);
    } catch (error) {
      reject(error);
    }
  });
};

const getFirebaseChatListUserData = ({ id, chatUserId }) => {
  new Promise((resolve, reject) => {
    try {
      var userInfoData = '';
      firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (response) => {
            // resolve(response.docs);
            response.docs.forEach((doc) => {
              if (doc._data.id == chatUserId) {
                userInfoData = doc._data;
                resolve(doc._data);
              }
            });
          },
          (error) => {
            reject(error);
          }
        );
      console.log('doc.>>', userInfoData);
      // resolve(userInfoData);
    } catch (error) {
      reject(error);
    }
  });
};

const updateBlockFirebaseChatList = ({ id, chatUserId, isBlock }) => {
  return new Promise((resolve, reject) => {
    try {
      const userSetList = firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (response) => {
            response.docs.forEach((doc) => {
              if (doc._data.id == chatUserId) {
                var newData = doc._data;
                if (
                  newData?.blockTo != undefined &&
                  newData?.blockBy != undefined
                ) {
                  newData.blockTo = isBlock ? isBlock : newData?.blockTo;
                  newData.blockBy = newData?.blockBy;
                } else {
                  if (newData?.blockTo == undefined) {
                    if (newData?.blockBy == undefined) {
                      newData['blockTo'] = isBlock;
                      newData['blockBy'] = isBlock ? false : true;
                    } else {
                      newData['blockTo'] = isBlock;
                      newData.blockBy = newData?.blockBy;
                    }
                  } else {
                    if (newData?.blockBy == undefined) {
                      newData.blockTo = isBlock ? isBlock : newData?.blockTo;
                      newData['blockBy'] = isBlock ? false : true;
                    } else {
                      newData.blockTo = isBlock ? isBlock : newData?.blockTo;
                      newData.blockBy = newData?.blockBy;
                    }
                  }
                }

                firestore()
                  .collection('ChatUserList')
                  .doc(id)
                  .collection('userlist')
                  .doc(doc.id)
                  .update(newData);
              }
            });
            // resolve(listUserData);
          },
          (error) => {
            reject(error);
          }
        );
      // resolve(userSetList);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUnBlockFirebaseChatList = ({ id, chatUserId, isBlock }) => {
  return new Promise((resolve, reject) => {
    try {
      const userSetList = firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (response) => {
            response.docs.forEach((doc) => {
              if (doc._data.id == chatUserId) {
                var newData = doc._data;
                newData.blockTo = isBlock ? false : newData?.blockTo;
                newData.blockBy = isBlock ? newData.blockBy : false;

                firestore()
                  .collection('ChatUserList')
                  .doc(id)
                  .collection('userlist')
                  .doc(doc.id)
                  .update(newData);
              }
            });
            // resolve(listUserData);
          },
          (error) => {
            reject(error);
          }
        );
      // resolve(userSetList);
    } catch (error) {
      reject(error);
    }
  });
};

const updateGoldMemberFirebaseChatList = ({ id, isSubscription }) => {
  return new Promise((resolve, reject) => {
    try {
      const userSetList = firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (res) => {
            res.docs.forEach((docs) => {

              const userSetLists = firestore()
                .collection('ChatUserList')
                .doc(docs._data.id)
                .collection('userlist')
                .get()
                .then(
                  (response) => {
                    response.docs.forEach((doc) => {


                      if (doc._data.id == id) {
                        console.log("userDTT>>>111", doc._data, doc._data.id == id)
                        var newData = doc._data;
                        if (
                          newData?.gold_member != undefined
                        ) {
                          newData.gold_member = isSubscription;
                        } else {

                          newData['gold_member'] = isSubscription;
                        }
// console.log("userDTT>>>", newData, docs._data.id, id)

const userSetListUpdate = firestore()
                          .collection('ChatUserList')
                          .doc(docs._data.id)
                          .collection('userlist')
                          .doc(doc.id)
                          .update(newData);
                      }
                    });
                    // resolve(listUserData);
                  },
                  (error) => {
                    reject(error);
                  }
                );


            });
            // resolve(listUserData);
          },
          (error) => {
            reject(error);
          }
        );
      // resolve(userSetList);
    } catch (error) {
      reject(error);
    }
  });
};

const getFirebaseChatUserList = ({ id, chatUserId }) => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .orderBy('dateTime', 'desc')
        .onSnapshot(
          (response) => {
            resolve(response.docs);
          },
          (error) => {
            reject(error);
          }
        );
    } catch (error) {
      reject(error);
    }
  });
};
const getFirebaseChatOrderByUserList = ({ id, userId }) => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('ChatUserList')
        .doc(id)
        .collection('userlist')
        .get()
        .then(
          (response) => {
            // resolve(response.docs);
            const listUserData = [];
            response.docs.forEach((doc) => {
              if (doc._data.id == userId) {
                listUserData.push(doc._data);
              }
            });
            resolve(listUserData);
          },
          (error) => {
            reject(error);
          }
        );
    } catch (error) {
      reject(error);
    }
  });
};

const getFirebaseChatList = ({ id, chatUserId }) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('ChatUserList')
      .doc(id)
      .collection('userlist')
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const setFirebaseUserChat = ({ data }) => {
  return new Promise((resolve, reject) => {
    try {
      var formattedNow = moment().format('DD MMM, hh:mm:ss A');
      var timeStamp = Date.now();
      var userReadMsg = '';
      const messageRrf = firestore()
        .collection('messages')
        .doc(data.chatId)
        .collection('messages')
        .add({
          message: data.message,
          maessageType:
            data.maessageType == 'application' ? 'pdf' : data.maessageType,
          date: formattedNow,
          sentDate: new Date(),
          senderId: data.senderId,
          receiverId: data.receiverId,
          status: '0',
          timeStamp: timeStamp,
          read: data.read,
        });

      resolve(messageRrf);
    } catch (err) {
      console.log('err>>>', err);
    }
  });
};
const setFirebaseUserChatLastMessage = ({ userId, chatId, data }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('ChatUserList')
      .doc(userId)
      .collection('userlist')
      .where('chatId', '==', chatId)
      .get()
      .then((res) => {
        console.log('resData>>>', res);
        res.forEach(function (doc) {
          doc.ref.update(data);
        });
      })
      .catch((err) => {
        reject(err);
        console.log('err>>>', err);
      });
  });
};
const setLastMessage = ({ id, userData, chatUserId }) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Chat')
      .doc(id)
      .collection('lastMessage')
      .set(userData)
      .then((response) => {
        console.log('response>>>', response);
        resolve(response);
      })
      .catch((error) => {
        console.log('responseerror>>>', error);
        reject(error);
      });
  });
};
const getLastMessage = ({ id, userData, chatUserId }) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Chat')
      .doc(id)
      .collection('lastMessage')
      .get()
      .then((response) => {
        console.log('response>>>', response);
        resolve(response);
      })
      .catch((error) => {
        console.log('responseerror>>>', error);
        reject(error);
      });
  });
};
// const updateLastMessage = ({id, userData, chatUserId}) => {
//   return new Promise((resolve, reject) => {
//     return firestore()
//       .collection('Chat')
//       .doc(id)
//       .collection('lastMessage')
//       .get()
//       .then(response => {
//         console.log('response>>>', response);
//         resolve(response);
//       })
//       .catch(error => {
//         console.log('responseerror>>>', error);
//         reject(error);
//       });
//   });
// };

const updateUserStatus = ({ id, status }) => {
  return new Promise((resolve, reject) => {
    try {
      const userStatus = firestore().collection('Users').doc(id).update({
        status: status,
        dateTime: new Date(),
      });
      resolve(userStatus);
    } catch (err) {
      reject(err);
    }
  });
};

const setNotificationData = ({ id, userData }) => {
  return new Promise((resolve, reject) => {
    try {
      const notificationData = firestore()
        .collection('Notification')
        .doc(id)
        .collection('notificationList')
        .add(userData);
      resolve(notificationData);
    } catch (error) {
      reject(error);
    }
  });
};

const getNotificationData = ({ id }) => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('Notification')
        .doc(id)
        .collection('notificationList')
        .orderBy('dateTime', 'desc')
        .onSnapshot(
          (response) => {
            resolve(response.docs);
          },
          (error) => {
            reject(error);
          }
        );
    } catch (error) {
      reject(error);
    }
  });
};

export {
  allUsersList,
  setFirebaseUserData,
  getFirebaseUserData,
  getLastMessage,
  setLastMessage,
  setFirebaseUserChat,
  getFirebaseChatList,
  setFirebaseChatList,
  getFirebaseChatUserList,
  getFirebaseChatOrderByUserList,
  updateUserStatus,
  setFirebaseUserChatLastMessage,
  setNotificationData,
  getNotificationData,
  deleteFirebaseChatList,
  updateBlockFirebaseChatList,
  updateUnBlockFirebaseChatList,
  getFirebaseChatListUserData,
  updateGoldMemberFirebaseChatList
};
