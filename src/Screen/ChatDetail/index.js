import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Modal,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../Resources/Colors';
import NotchArea from '../../Component/SafeArea';
import { backIcon, addIcon, downloadIcon, STAR_ICON } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import CustomHeader from '../../Component/CustomHeader';
import { NoDataFoundView } from '../../Component/CustomErrorComponent';
import { style } from './styles';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFirebaseChatListUserData,
  getFirebaseChatOrderByUserList,
  setFirebaseChatList,
  setFirebaseUserChat,
  setFirebaseUserChatLastMessage,
  updateBlockFirebaseChatList,
  updateUnBlockFirebaseChatList,
} from '../../Constants/FireStoremanager/FireStoremanager';
import ChatRow from '../../Component/ChatRow';
import ReceiverUserProfile from '../../Component/ReceiverUserProfile';
import DocumentPicker, { types } from 'react-native-document-picker';
import { imageUplaod } from '../../Redux/services/profileService';
import { setLoading } from '../../Redux/actions/authAction';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import Emitter from '../../Util/eventEmitter';
import { RouteName } from '../../Navigation/routeName';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-simple-toast';
import EmojiPicker from '../../Constants/CustomEmojiPicker/emojis/EmojiPicker';
import {
  compareTodayDate,
  compareTwoDate,
  getDateTime,
} from '../../Util/constant';
import moment from 'moment';
import { blockuser } from '../../Redux/actions/homeAction';
import { setBlockUserDataAction } from '../../Redux/actions/profileAction';

const ChatDetail = ({ navigation, route }) => {
  const { receiverId, receiverData } = route?.params;
  const [messages, setMessages] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [message, setMessage] = useState('');
  const [cureentMessage, setCureentMessage] = useState('');
  const listRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [readLastIndex, setReadLastIndex] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentUserData, setCurrentUserData] = useState('');
  const height = useSharedValue(70);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getMessageData();
    statusUpdateUnreadMessage();
    setShowEmojiPicker(false);
    getCureentUserData();
  }, []);

  var inputRef = useRef(null);

  const getCureentUserData = async () => {
    firestore()
      .collection('ChatUserList')
      .doc(userData?.data._id)
      .collection('userlist')
      .get()
      .then(
        (response) => {
          response.docs.forEach((doc) => {
            if (doc._data.id == receiverId) {
              console.log('cureentUser>>>', doc._data);
              setCurrentUserData(doc._data);
            }
          });
        },
        (error) => {
          reject(error);
        }
      );
  };

  const getMessageData = () => {
    firestore()
      .collection('messages')
      .doc(route?.params?.chatId)
      .collection('messages')
      .orderBy('sentDate')
      .onSnapshot(
        (response) => {
          const listData = [];
          var chatData = {};
          var lastIndexRead = 0;
          const currentId = userData?.data?.user_id || userData?.data?._id;
          response?.docs?.forEach((doc, index) => {
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
        },
        (error) => {
          console.log('Error getMessages>>>>>', error);
        }
      );
  };

  const statusUpdateUnreadMessage = () => {
    const senderid = userData?.data?.user_id || userData?.data?._id;
    firestore()
      .collection('messages')
      .doc(route?.params?.chatId)
      .collection('messages')
      .orderBy('sentDate')
      .get()
      .then(
        (response) => {
          response.docs.forEach((doc) => {
            if (doc._data.senderId != senderid) {
              if (doc._data.read != undefined) {
                if (doc._data.read == false) {
                  firestore()
                    .collection('messages')
                    .doc(route?.params?.chatId)
                    .collection('messages')
                    .doc(doc?.id)
                    .update({
                      read: true,
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
    const lastSince = moment(item.sentDate.toDate()).format('HH:mm');
    var a = moment(item.sentDate.toDate(), 'YYYY-MM-DD');
    var b = moment(
      messages[index == 0 ? 0 : index - 1]?.sentDate.toDate(),
      'YYYY-MM-DD'
    );
    const isDateView =
      index == 0
        ? true
        : compareTwoDate({
            startDate: item.sentDate.toDate(),
            endDate: messages[index == 0 ? 0 : index - 1]?.sentDate.toDate(),
          })
        ? false
        : true;
    return (
      <View>
        {isDateView && (
          <View style={style.cureentDateViewStyle}>
            <Text style={style.cureentDateStyle}>
              {compareTodayDate(item.sentDate.toDate())}
            </Text>
          </View>
        )}
        {isReceiverView && (
          <ReceiverUserProfile
            item={item}
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
            setVisible(true);
            setSelectedFile(data.data);
            setSelectedType(data.type);
          }}
          lastSince={lastSince}
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
    if (currentUserData?.blockTo) {
      Alert.alert('', `Unblock ${receiverData?.name} to send a message`, [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Unblock',
          onPress: () => {
            unBlockUser();
            sendNewMessage();
          },
        },
      ]);
    } else {
      sendNewMessage();
    }
  };

  const sendNewMessage = async () => {
    if (cureentMessage != '') {
      setMessage('');
      var data = {
        chatId: route?.params?.chatId,
        senderId: userData?.data?.user_id || userData?.data?._id,
        receiverId: receiverId,
        message: cureentMessage.trim(),
        maessageType: 'text',
        read: false,
      };

      if (currentUserData?.blockBy) {
        setMessages(data);
        Keyboard.dismiss();
      } else {
        const messageData = await setFirebaseUserChat({ data: data });
        setCureentMessage('');
        Keyboard.dismiss();

        updateLastMessageSender();
        updateLastMessageReceiver();
        Emitter.emit('ChatRef');
      }
    }
  };

  const unBlockUser = () => {
    dispatch(setLoading(true));
    let params = {
      block_user_id: receiverId,
      status: '',
    };
    dispatch(
      blockuser({
        params,
        onSuccess: (result) => {
          const blockchatUser = updateUnBlockFirebaseChatList({
            id: userData.data._id,
            chatUserId: receiverId,
            isBlock: true,
          });
          const blockchatOtherUser = updateUnBlockFirebaseChatList({
            id: receiverId,
            chatUserId: userData.data._id,
            isBlock: false,
          });
          getCureentUserData();
          getBlockUSerData();
          dispatch(setBlockUserDataAction([]));
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const updateLastMessageSender = async () => {
    const lastMesSender = await setFirebaseUserChatLastMessage({
      userId: userData?.data?.user_id || userData?.data?._id,
      chatId: route?.params?.chatId,
      data: {
        message: message.trim(),
        maessageType: 'text',
        dateTime: new Date(),
      },
    });
  };

  const updateLastMessageReceiver = async () => {
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
        chatId: route?.params?.chatId,
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
        chatId: route?.params?.chatId,
        data: {
          message: message.trim(),
          maessageType: 'text',
          dateTime: new Date(),
        },
      });
    }
  };
  const fetchLocalFile = () => {
    setShowEmojiPicker(false);
    dispatch(setLoading(true));
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.doc, types.docx, types.images, types.pdf],
    })
      .then(async (response) => {
        if (response[0].size > 10000000) {
          alert('File size very high. Please fetch document less then 10 MB ');
        } else {
          let imageData = {
            uri: response[0].uri,
            type: response[0].type,
            name: response[0].name,
          };
          var getImageURI = await imageUplaod({
            file: imageData,
            token: userData?.access_token,
          });

          let data = {
            chatId: route?.params?.chatId,
            senderId: userData?.data?.user_id || userData?.data?._id,
            receiverId: receiverId,
            message: getImageURI.data[0],
            maessageType: response[0].type.split('/')[0],
            messageName: response[0].name,
            read: receiverData?.status == 'online' ? true : false,
          };
          dispatch(setLoading(false));
          const messageData = await setFirebaseUserChat({ data: data });
          const lastMesSender = await setFirebaseUserChatLastMessage({
            userId: userData?.data?.user_id || userData?.data?._id,
            chatId: route?.params?.chatId,
            data: {
              message: getImageURI.data[0],
              maessageType: response[0].type.split('/')[0],
              dateTime: new Date(),
            },
          });
          const lastMesReceiver = await setFirebaseUserChatLastMessage({
            userId: receiverId,
            chatId: route?.params?.chatId,
            data: {
              message: getImageURI.data[0],
              maessageType: response[0].type.split('/')[0],
              dateTime: new Date(),
            },
          });
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log('error', err);
      });
  };

  const downloadfile = (url) => {
    const { config, fs } = ReactNativeBlobUtil;
    let PictureDir = fs.dirs.DownloadDir;
    var type = selectedType == 'image' ? '.jpg' : '.pdf';
    config({
      title: selectedType == 'image' ? 'file.jpg' : 'file.pdf',
      path: `${PictureDir}/${new Date().getTime()}${type}`,
      fileCache: true,
      showNotification: true,
      notification: true,
    })
      .fetch('GET', url, {})
      .then((res) => {
        Toast.show('download successfully');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const onChangeEmoji = (res) => {
    var text = `${message}${res}`;
    setMessage(text);
    setCureentMessage(text);
  };

  const ListFooterComponent = () => {
    return (
      <>
        {currentUserData?.blockTo ? (
          <View style={style.cureentBlockViewStyle}>
            <Text style={style.cureentBlockStyle} onPress={() => unBlockUser()}>
              {Strings.BLOCK_USER_MESSAGE}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        NotchArea.AndroidSafeArea,
        { flex: 1, backgroundColor: Colors.White },
      ]}
    >
      <CustomHeader
        constainerStyle={{ paddingHorizontal: '5%' }}
        leftButtons={
          <TouchableOpacity
            onPress={() => {
              setShowEmojiPicker(false);
              if (route.params.isOther) {
                // navigation
                navigation.reset({
                  index: 0,
                  routes: [{ name: RouteName.HOMESTACK }],
                });
              } else {
                navigation.goBack();
              }
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
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
                  receiverId: route?.params?.receiverId,
                });
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 26, width: 26 }}
                source={addIcon}
              />
            </TouchableOpacity>
          )
        }
        title={`${receiverData?.name ? receiverData?.name : ''}`}
        isSubscription={receiverData?.gold_member ? receiverData?.gold_member : false}
      />

      {/* // Conversation in chat */}
      {/*  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? -300 : 0}
        style={style.subContainer}
        enabled
      >
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
          ListFooterComponent={ListFooterComponent}
        />
        <View style={{ padding: 15 }} />
        <View
          style={[
            { justifyContent: 'center', backgroundColor: Colors.White },
            {
              height: showEmojiPicker
                ? Dimensions.get('window').height * 0.5
                : Platform.OS == 'android'
                ? Dimensions.get('window').height * 0.08
                : Dimensions.get('window').height * 0.06,
            },
          ]}
        >
          <View style={[style.textVwCntnr]}>
            <View style={style.inoutVw}>
              <TextInput
                ref={inputRef}
                multiline={true}
                style={style.msgTxtInpt}
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  setCureentMessage(text);
                }}
                onFocus={() => {
                  setShowEmojiPicker(false);
                }}
                placeholder={'Type a message.....'}
                placeholderTextColor={'#000000'}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={style.sendingButtonView}>
              <TouchableOpacity
                onPress={() => fetchLocalFile()}
                style={style.emojBtn}
              >
                <Image
                  style={style.sendImg}
                  source={require('../../Resources/assets/attach_icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                style={style.emojBtn}
              >
                <Image
                  style={style.sendImg}
                  source={require('../../Resources/assets/emoj_icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendMessage()}
                style={style.sendBtn}
              >
                <Image
                  style={style.sendImg}
                  source={require('../../Resources/assets/sendIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <EmojiPicker selectedEmoji={onChangeEmoji} />
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        {/*All views of Modal*/}
        <SafeAreaView style={{ flex: 1 }}>
          <CustomHeader
            constainerStyle={{ paddingHorizontal: '5%' }}
            leftButtons={
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 26, width: 26 }}
                  source={backIcon}
                />
              </TouchableOpacity>
            }
            rightButtons={
              <TouchableOpacity
                onPress={() => {
                  downloadfile(selectedFile);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 26, width: 26 }}
                  source={downloadIcon}
                />
              </TouchableOpacity>
            }
            title={''}
          />
          {selectedType == 'image' ? (
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={200}
              imageHeight={200}
            >
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri: selectedFile,
                }}
              />
            </ImageZoom>
          ) : (
            <View style={style.pdfContainer}>
              <Pdf
                trustAllCerts={false}
                style={style.pdf}
                source={{
                  uri: selectedFile,
                  cache: true,
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatDetail;
