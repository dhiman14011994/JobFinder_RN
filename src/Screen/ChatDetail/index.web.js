import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { FlatList, Linking } from 'react-native-web';
import SendIcon from '../../Resources/assets/sendIcon.png';
import EmojiIcon from '../../Resources/assets/emoj_icon.png';
import AttchIcon from '../../Resources/assets/attach_icon.png';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../Resources/Colors';
import { backIcon, addIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { NoDataFoundView } from '../../Component/CustomErrorComponent';
import { style } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFirebaseChatOrderByUserList,
  setFirebaseChatList,
  setFirebaseUserChat,
  setFirebaseUserChatLastMessage,
} from '../../Constants/FireStoremanager/FireStoremanager';
import ChatRow from '../../Component/ChatRow';
import ReceiverUserProfile from '../../Component/ReceiverUserProfile';
import { imageUplaod } from '../../Redux/services/profileService';
import { setLoading } from '../../Redux/actions/authAction';
import Emitter from '../../Util/eventEmitter';
import { RouteName } from '../../Navigation/routeName';
import EmojiPicker from '../../Constants/CustomEmojiPicker/emojis/EmojiPicker';
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '../../Constants/FirebaseWeb';
import { isChatDetails } from '../../Redux/actions/profileAction';
import CustomHeaderChat from '../../Component/CustomHeaderChat';
import { useDropzone } from 'react-dropzone';
import { isNative } from '../../Util';

const ChatDetail = ({ navigation }) => {
  const chatUserData = useSelector((state) => state.profile.userChatDetails);
  const { receiverId, receiverData, chatId, isOther } = chatUserData
    ? chatUserData
    : { receiverId: '0', receiverData: {}, chatId: '1024562', isOther: false };
  const [messages, setMessages] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [message, setMessage] = useState('');
  const [cureentMessage, setCureentMessage] = useState('');
  const [docFile, setDocFile] = useState({});
  const [docPath, setdocPath] = useState('');
  const listRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [readLastIndex, setReadLastIndex] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { width, height } = Dimensions.get('window');
  const window = useWindowDimensions();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getMessageData();
    statusUpdateUnreadMessage();
    setShowEmojiPicker(false);
  }, []);

  var inputRef = useRef(null);

  const getMessageData = () => {
    const unsub = onSnapshot(
      query(
        collection(firestore, 'messages', chatId, 'messages'),
        orderBy('sentDate')
      ),
      (snapshot) => {
        const listData = [];
        var chatData = {};
        var lastIndexRead = 0;
        const currentId = userData?.data?.user_id || userData?.data?._id;
        snapshot?.docs?.forEach((doc, index) => {
          chatData = doc.data();
          chatData.message_id = doc.id;
          if (chatData.senderId == currentId) {
            if (chatData.read == true) {
              lastIndexRead = index;
            }
          }
          listData.push(chatData);
        });
        setMessages(listData);
        dispatch(setLoading(false));
        statusUpdateUnreadMessage();
        setReadLastIndex(lastIndexRead);
      }
    );
  };

  const statusUpdateUnreadMessage = async () => {
    const senderid = userData?.data?.user_id || userData?.data?._id;
    await getDocs(
      query(
        collection(firestore, 'messages', chatId, 'messages'),
        orderBy('sentDate')
      ),
      (response) => {
        response.docs.forEach((doc) => {
          if (doc._data.senderId != senderid) {
            if (doc._data.read != undefined) {
              if (doc._data.read == false) {
                const docRef = collection(
                  firestore,
                  'messages',
                  chatId,
                  'messages',
                  doc?.id
                );
                const readData = {
                  read: true,
                };
                updateDoc(docRef, readData)
                  .then((doRef) => {
                    console.log(
                      'A New Document Field has been added to an existing document'
                    );
                  })
                  .catch((err) => {
                    console.log('err', err);
                  });
              } else {
              }
            } else {
            }
          } else {
          }
        });
      },
      (error) => {
        console.log('Error getMessages>>>>>', error);
      }
    );
  };

  const renderItem = ({ item, index }) => {
    const isReceiverView =
      index == 0
        ? item?.senderId == receiverData?.id
          ? true
          : false
        : messages[index - 1]?.senderId == receiverData?.id
        ? false
        : item?.senderId == receiverData?.id;
    const uId = userData?.data?.user_id || userData?.data?._id;
    return (
      <View>
        {isReceiverView && (
          <ReceiverUserProfile
            window={window}
            data={receiverData}
            onUserProfile={() => {}}
          />
        )}

        <ChatRow
          userId={userData?.data?.user_id || userData?.data?._id}
          index={index}
          data={item}
          readIndex={readLastIndex}
          receiverData={receiverData}
          viewDocumentFile={(data) => {
            Linking.openURL(data.data);
          }}
        />
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={style.emptyView}>
        <NoDataFoundView warning_message={'No data'} />
      </View>
    );
  };

  const sendMessage = async () => {
    inputRef?.current?.blur();
    Keyboard.dismiss();
    setShowEmojiPicker(false);
    if (cureentMessage != '') {
      setMessage('');
      let data = {
        chatId: chatId,
        senderId: userData?.data?.user_id || userData?.data?._id,
        receiverId: receiverId,
        message: cureentMessage.trim(),
        maessageType: 'text',
        read: false,
      };

      const messageData = await setFirebaseUserChat({ data: data });
      setCureentMessage('');
      Keyboard.dismiss();

      updateLastMessageSender();
      updateLastMessageReceiver();
      Emitter.emit('ChatRef');
    }
  };
  const updateLastMessageSender = async () => {
    const lastMesSender = await setFirebaseUserChatLastMessage({
      userId: userData?.data?.user_id || userData?.data?._id,
      chatId: chatId,
      data: {
        message: message.trim(),
        maessageType: 'text',
        dateTime: new Date(),
      },
    });
  };

  const updateLastMessageReceiver = async () => {
    console.log(
      'otherUserExist.length>>>',
      receiverId,
      userData?.data?.user_id || userData?.data?._id,
      chatId
    );
    try {
      const otherUserExist = await getFirebaseChatOrderByUserList({
        id: receiverId,
        userId: userData?.data?.user_id || userData?.data?._id,
      });
      if (otherUserExist.length == 0) {
        var cureentUserData = {
          id: userData?.data?.user_id || userData?.data?._id,
          name: userData?.data?.name,
          role: userData?.data?.role,
          image: userData?.data?.image || '',
          status: '',
          chatId: chatId,
          message: message.trim(),
          maessageType: 'text',
          dateTime: new Date(),
        };
        var setOtherUserList = await setFirebaseChatList({
          id: receiverId,
          userData: cureentUserData,
          chatUserId: userData?.data?.user_id || userData?.data?._id,
        });
      } else {
        const lastMesReceiver = await setFirebaseUserChatLastMessage({
          userId: receiverId,
          chatId: chatId,
          data: {
            message: message.trim(),
            maessageType: 'text',
            dateTime: new Date(),
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'text/pdf': ['.pdf'],
    },
    onDrop: async (acceptedFiles) => {
      try {
        let response = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        var getImageURI = await imageUplaod({
          file: response[0],
          token: userData?.access_token,
        });
        let data = {
          chatId: chatId,
          senderId: userData?.data?.user_id || userData?.data?._id,
          receiverId: receiverId,
          message: getImageURI.data[0],
          maessageType: response[0].type.split('/')[0],
          messageName: response[0].name,
          read: receiverData?.status == 'online' ? true : false,
        };
        setShowEmojiPicker(false);
        dispatch(setLoading(false));
        const messageData = await setFirebaseUserChat({ data: data });
        const lastMesSender = await setFirebaseUserChatLastMessage({
          userId: userData?.data?.user_id || userData?.data?._id,
          chatId: chatId,
          data: {
            message: getImageURI.data[0],
            maessageType: response[0].type.split('/')[0],
            dateTime: new Date(),
          },
        });
        const lastMesReceiver = await setFirebaseUserChatLastMessage({
          userId: receiverId,
          chatId: chatId,
          data: {
            message: getImageURI.data[0],
            maessageType: response[0].type.split('/')[0],
            dateTime: new Date(),
          },
        });

        dispatch(setLoading(false));
        // setuserImage(getImageURI.data[0]);
      } catch (err) {
        dispatch(setLoading(false));
      }
    },
  });

  //   const heightAnimatedStyle = useAnimatedStyle(() => {
  //     return {
  //       height: height.value,
  //     };
  //   });

  const onChangeEmoji = (res) => {
    var text = `${message}${res}`;
    setMessage(text);
    setCureentMessage(text);
  };
  return (
    <View style={[{ flex: 1, backgroundColor: Colors.White }]}>
      <CustomHeaderChat
        constainerStyle={{ paddingHorizontal: height * 0.02 }}
        leftButtons={
          <TouchableOpacity
            onPress={() => {
              setShowEmojiPicker(false);
              if (isOther) {
                // navigation
                // navigation.reset({
                //   index: 0,
                //   routes: [{ name: RouteName.HOMESTACK }],
                // });
                dispatch(isChatDetails(false));
              } else {
                dispatch(isChatDetails(false));
                navigation.goBack();
              }
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.025, width: height * 0.025 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={
          receiverData?.role !== Strings.PROFESSIONAL ? (
            <></>
          ) : type !== Strings.RECRUITER ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteName.INTERVIEW_DATETIME, {
                  receiverId: receiverId,
                });
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: height * 0.025, width: height * 0.025 }}
                source={addIcon}
              />
            </TouchableOpacity>
          )
        }
        title={receiverData?.name || ''}
      />

      <View style={{ height: '88%' }}>
        <FlatList
          data={messages || []}
          renderItem={renderItem}
          automaticallyAdjustContentInsets={false}
          ListEmptyComponent={listEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
          onContentSizeChange={() => {
            if (listRef && listRef.current) {
              listRef.current.scrollToEnd({ animated: true });
            }
          }}
          onLayout={() => {
            if (listRef && listRef.current) {
              listRef.current.scrollToEnd({ animated: true });
            }
          }}
        />
        <View style={{ padding: 15 }} />
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.White,
            },
            showEmojiPicker
              ? {}
              : { height: Dimensions.get('window').height * 0.08 },
          ]}
        >
          <View
            style={[
              {
                borderColor: '#898A8D',
                width: '90%',
                marginLeft: '5%',
                marginRight: '5%',
                borderRadius: 10,
                borderWidth: 1,
                // padding: 8,
                paddingVertical: 0,
                alignItems: 'center',
                flexDirection: 'row',

                alignSelf: 'center',
                backgroundColor: Colors.White,
              },
            ]}
          >
            <View
              style={[
                style.inoutVw,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <TextInput
                ref={inputRef}
                multiline={true}
                style={[
                  style.msgTxtInptWeb,
                  isNative ? {} : { outlineColor: 'white' },
                ]}
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  setCureentMessage(text);
                }}
                onFocus={() => {
                  setShowEmojiPicker(false);
                }}
                placeholder={'Type a message.....'}
                placeholderTextColor={'#898A8D'}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={[style.sendingButtonView]}>
              <div
                {...getRootProps({
                  className: 'dropzone',
                  onClick: (event) => {},
                })}
              >
                <TouchableOpacity disabled style={style.emojBtnWeb}>
                  <Image style={style.sendImgWeb} source={AttchIcon} />
                </TouchableOpacity>
              </div>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                style={style.emojBtnWeb}
              >
                <Image style={style.sendImgWeb} source={EmojiIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendMessage()}
                style={style.sendBtnWeb}
              >
                <Image style={style.sendImgWeb} source={SendIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <EmojiPicker isOpen={showEmojiPicker} selectedEmoji={onChangeEmoji} />
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default ChatDetail;
