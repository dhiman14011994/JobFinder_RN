import { firestore } from '../FirebaseWeb';
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import moment from 'moment';

function allUsersList() {
  return new Promise((resolve, reject) => {
    return getDocs(collection(firestore, 'Participant')).then(
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
    setDoc(doc(firestore, 'Users', id), userData)
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
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, 'Users', id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists() ? docSnap.data() : false;
      if (docSnap.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log('err', error);
    }
  });
};

const setFirebaseChatList = ({ id, userData, chatUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userSetList = await addDoc(
        collection(firestore, 'ChatUserList', id, 'userlist'),
        userData
      );
      resolve(userSetList);
    } catch (error) {
      console.log('error>>>', error);
      reject(error);
    }
  });
};

const getFirebaseChatUserList = ({ id, chatUserId }) => {
  return new Promise((resolve, reject) => {
    try {
      onSnapshot(
        query(
          collection(firestore, 'ChatUserList', id, 'userlist'),
          orderBy('dateTime', 'desc'),
          (snapshot) => {
            resolve(snapshot.docs);
          },
          (error) => {
            reject(error);
          }
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};
const getFirebaseChatOrderByUserList = ({ id, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // getDocs(collection(firestore, 'ChatUserList', id, 'userlist'))
      //   .then((response) => {
      //     const listUserData = [];
      //     response.docs.forEach((docs) => {
      //       var newRow = docs.data();
      //       if (newRow.id == userId) {
      //         listUserData.push(newRow);
      //       }
      //     });
      //     resolve(listUserData);
      //   })
      //   .catch((error) => {
      //     console.log('err>>>', error);
      //     reject(error);
      //   });
      const querySnapshot = await getDocs(
        collection(firestore, 'ChatUserList', id, 'userlist')
      );
      const listUserData = [];
      querySnapshot.forEach((doc) => {
        var newRow = doc.data();
        if (newRow.id == userId) {
          listUserData.push(newRow);
        }
      });
      resolve(listUserData);
    } catch (error) {
      console.log('err>>>11', error);
      reject(error);
    }
  });
};

const getFirebaseChatList = ({ id, chatUserId }) => {
  return new Promise(async (resolve, reject) => {
    return getDocs(doc(firestore, 'ChatUserList', id, 'userlist'))
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
  return new Promise(async (resolve, reject) => {
    try {
      var formattedNow = moment().format('DD MMM, hh:mm:ss A');
      var timeStamp = Date.now();
      var userReadMsg = '';

      const messageRrf = await addDoc(
        collection(firestore, 'messages', data.chatId, 'messages'),
        {
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
        }
      );

      resolve(messageRrf);
    } catch (err) {
      console.log('err>>>', err);
    }
  });
};
const setFirebaseUserChatLastMessage = ({ userId, chatId, data }) => {
  console.log('userId, chatId, data', userId, chatId, data);
  return new Promise((resolve, reject) => {
    try {
      getDocs(collection(firestore, 'ChatUserList', userId, 'userlist'))
        .then((res) => {
          res?.docs?.forEach((docs, index) => {
            var newRow = docs.data();
            if (newRow.chatId == chatId) {
              newRow.message = data?.message;
              newRow.maessageType = data?.maessageType;
              newRow.dateTime = data?.dateTime;

              updateDoc(
                doc(firestore, 'ChatUserList', userId, 'userlist', docs?.id),
                newRow
              );
            }
          });
        })
        .catch((err) => {
          reject(err);
          console.log('err>>>', err);
        });
    } catch (err) {
      console.log('err111>>>', err);
    }
  });
};
const setLastMessage = ({ id, userData, chatUserId }) => {
  return new Promise((resolve, reject) => {
    return setDoc(collection(firestore, 'Chat', id, 'lastMessage'), userData)
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
    return getDocs(collection(firestore, 'Chat', id, 'lastMessage'))
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

const updateUserStatus = ({ id, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userStatus = await updateDoc(collection(firestore, 'Users', id), {
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
  return new Promise(async (resolve, reject) => {
    try {
      const notificationData = await addDoc(
        collection(firestore, 'Notification', id, 'notificationList'),
        userData
      );
      resolve(notificationData);
    } catch (error) {
      reject(error);
    }
  });
};

const getNotificationData = ({ id }) => {
  return new Promise((resolve, reject) => {
    try {
      onSnapshot(
        query(
          collection(firestore, 'Notification', id, 'notificationList'),
          orderBy('dateTime', 'desc'),
          (response) => {
            resolve(response.docs);
          },
          (error) => {
            reject(error);
          }
        )
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
};
