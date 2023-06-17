import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  findNodeHandle,
  PermissionsAndroid,
  RefreshControl,
  Platform,
  // SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../Component/CustomHeader';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  backIcon,
  headerLogo,
  dummyPost,
  ArrowBottomRightDownload,
  AddMediaSupportIcon,
  SendSupportMessageIcon,
  UserPlaceholder,
} from '../../../Resources/assets';
import { theme } from '../../../Util/constant';
import Colors from '../../../Resources/Colors';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import { useRef } from 'react';
import { useState } from 'react';
import CustomModal from '../../../Component/CustomModal/CustomModal';
import { setLoading } from '../../../Redux/actions/authAction';
import {
  fetchSingleSupportTicketChat,
  sendMessageSupport,
} from '../../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../../Redux/constants/EndPoint';
import moment from 'moment';
import { uploadImage } from '../../../Redux/actions/homeAction';
import Video from 'react-native-video';
import Spinner from '../../../Util/spinner';
import NotchArea from '../../../Component/SafeArea';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Strings from '../../../Resources/Strings';

const SupportDetail = ({ navigation, route }) => {
  const scrollRef = useRef(null);
  const [mediaImage, setMediaImage] = useState('');
  uplodImage;
  const [chatMessage, setChatMessage] = useState('');
  const [adminChat, setAdminChat] = useState([]);
  const [mediaType, setMediaType] = useState('video/mp4');
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const ticketDetails = useSelector((state) => state.profile.ticketDetails);
  const myProfile = useSelector((state) => state.profile.myProfile);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchSingleSupportTicket();
  }, []);

  useEffect(() => {
    if (ticketDetails) {
      const data = [ticketDetails[0], ...ticketDetails[0].support_message];
      setAdminChat(data);
    }
  }, [ticketDetails]);

  const fetchSingleSupportTicket = () => {
    const { params } = route;
    let param = {
      supportID: params?.supportId,
    };
    // dispatch(setLoading(true));
    dispatch(
      fetchSingleSupportTicketChat({
        param,
        onSuccess: (result) => {
          dispatch(setLoading(false));
          setRefreshing(false);
          setTimeout(() => {
            if (scrollRef && scrollRef.current) {
              scrollRef.current.scrollToEnd({ animated: true });
            }
          }, 100);
        },
        onError: (error) => {
          // dispatch(setLoading(false));
          setRefreshing(false);
        },
      })
    );
  };

  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        maxWidth: 1000,
        maxHeight: 1000,
        mediaType: 'mixed',
        videoQuality: 'low',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, (res) => {
            if (res?.assets && res?.assets[0]) {
              uploadFetchFile(res);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        } else {
          launchImageLibrary(options, (response) => {
            console.log('response======', response);
            if (response?.assets && response?.assets[0]) {
              uploadFetchFile(response);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
      } else {
        dispatch(setLoading(false));
        setModal(false);
      }
    } catch (error) {
      dispatch(setLoading(false));
      setModal(false);
    }
  };

  const uploadFetchFile = async (response) => {
    const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      setModal(false);
      setMediaImage(response.assets[0].uri);
      setMediaType(response.assets[0].type);

      dispatch(setLoading(false));
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };

  const sendMessageToAdmin = (param) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        sendMessageSupport({
          param,
          onSuccess: (result) => {
            setChatMessage('');
            setMediaImage('');
            dispatch(setLoading(false));
            setTimeout(() => {
              fetchSingleSupportTicket();
            }, 200);

            console.log('send message', result.data);
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const uplodImage = () => {
    try {
      const { params } = route;

      if (chatMessage === '') {
        return;
      }
      let param = {};
      if (mediaImage === '') {
        param = {
          message: chatMessage,
          upload_pic_video: [],
          support_id: params?.supportId,
        };

        sendMessageToAdmin(param);
      } else {
        let data = { imagePath: mediaImage };
        dispatch(setLoading(true));
        dispatch(
          uploadImage({
            data,
            onSuccess: (result) => {
              if (result.data) {
                param = {
                  message: chatMessage,
                  upload_pic_video: [result.data],
                  support_id: params?.supportId,
                };
                sendMessageToAdmin(param);
                dispatch(setLoading(false));
              }
              console.log('Image UPload', result.data);
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const renderMediaFiles = (item, index) => {
    const mediaType = item.includes('.mp4') ? 'video' : 'image';
    return (
      <View style={{ paddingHorizontal: 5 }} key={`index${index}`}>
        {mediaType === 'video' ? (
          <Video
            paused
            source={{ uri: EndPoint.baseAssestURL + item }}
            style={{ height: 44, width: 44 }}
          />
        ) : (
          <FastImage
            defaultSource={UserPlaceholder}
            style={{ height: 44, borderRadius: 12, width: 44 }}
            source={
              item ? { uri: EndPoint.baseAssestURL + item } : UserPlaceholder
            }
          />
        )}
      </View>
    );
  };

  const renderSendMessageView = () => {
    return (
      <View style={{ paddingVertical: 8, backgroundColor: Colors.White }}>
        {mediaImage !== '' && (
          <View style={{ paddingHorizontal: 16 }}>
            {mediaType === 'video/mp4' ? (
              <Video
                paused
                source={{ uri: mediaImage }}
                style={{ height: 44, width: 44 }}
              />
            ) : (
              <Image
                // resizeMode="contain"
                style={{ height: 44, width: 44 }}
                source={{ uri: mediaImage }}
              />
            )}
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            paddingHorizontal: 12,
            paddingTop: 12,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            // onPress={() => setModal(true)}
            style={{
              backgroundColor: '#E1E7FE',
              padding: 18,
              borderRadius: 44,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 18, width: 18 }}
              source={AddMediaSupportIcon}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginHorizontal: 12,
              borderColor: Colors.SilverLight,
              borderWidth: 0.5,
              borderRadius: 25,
              backgroundColor: '#F6F6F6',
            }}
          >
            <TextInput
              placeholder="Type here"
              value={chatMessage}
              onChangeText={(text) => setChatMessage(text)}
              style={{
                paddingVertical: 16,
                ...theme.fontRegular,
                paddingHorizontal: 8,
                color: Colors.Black,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={uplodImage}
            style={{
              padding: 18,
              borderRadius: 44,
              borderColor: Colors.SilverLight,
              borderWidth: 0.5,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 18, width: 18 }}
              source={SendSupportMessageIcon}
            />
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </View>
    );
  };

  const downloadDocument = (data) => {
    data?.upload_pic_video.map((it, index) => {
      const types = it.includes('.mp4') ? 'video' : 'image';
      const { config, fs } = ReactNativeBlobUtil;
      let PictureDir = fs.dirs.DownloadDir;
      var type = type == 'image' ? '.jpg' : '.mp4';
      var url = `${EndPoint.baseAssestURL}${it}`;
      console.log('url>>>>', url, it);
      config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        title: type == 'image' ? 'file.jpg' : 'file.mp4',
        path: `${PictureDir}/${new Date().getTime()}${type}`,
        fileCache: true,
        showNotification: true,
        notification: true,
      })
        .fetch('GET', url, {
          //some headers ..
        })
        .then((res) => {
          console.log('res>>>', res);
          // the temp file path
          // dispatch(setLoading(false))

          alert('download successfully');
          // console.log('The file saved to download pdf ', res.path())
        })
        .catch((error) => {
          console.log('err>>>', error);
          // dispatch(setLoading(false))
          // console.log('error while download pdf file =====', error)
        });
    });
    // }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 12,
          shadowColor: Colors.DimGray,
          backgroundColor: Colors.White,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4.84,
          elevation: 6,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FastImage
              style={{ height: 44, width: 44, borderRadius: 44 / 2 }}
              defaultSource={UserPlaceholder}
              source={
                item?.is_type && item?.is_type === 'Admin'
                  ? headerLogo
                  : myProfile?.image
                  ? { uri: EndPoint.baseAssestURL + myProfile?.image }
                  : myProfile?.userinfo?.image
                  ? { uri: EndPoint.baseAssestURL + myProfile?.userinfo.image }
                  : headerLogo
              }
            />

            <View
              style={{
                paddingHorizontal: 12,
                flex: 1,
              }}
            >
              {item?.ticket_number ? (
                <CustomText
                  fontSize={`${fontResize(14)}px`}
                  textTransform={'uppercase'}
                  {...theme.fontSemiBold}
                >
                  {item?.ticket_number || ''}
                </CustomText>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <CustomText
                  fontSize={`${fontResize(16)}px`}
                  textTransform={'capitalize'}
                  marginTop={'4px'}
                  marginBottom={'4px'}
                  {...theme.fontBold}
                >
                  {item?.is_type && item?.is_type === 'Admin'
                    ? 'Admin'
                    : myProfile?.name || ''}
                </CustomText>
                <CustomText
                  fontSize={`${fontResize(16)}px`}
                  textColor={
                    item?.status === 'Pending'
                      ? Colors.OrangeColor
                      : Colors.GreenColor
                  }
                  textTransform={'capitalize'}
                  {...theme.fontSemiBold}
                >
                  {item?.status || ''}
                </CustomText>
              </View>

              <CustomText
                fontSize={`${fontResize(12)}px`}
                marginTop={'4px'}
                textColor={Colors.DimGray}
                textTransform={'capitalize'}
                {...theme.fontMedium}
              >
                {`${moment(item?.created_at ?? '').format(
                  'MMMM DD, YYYY'
                )} | ${moment(item?.created_at ?? '').format('hh:mm a')}`}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 16 }}>
          <CustomText
            fontSize={`${fontResize(11)}px`}
            textTransform={'capitalize'}
            textColor={'#979797'}
            marginBottom={'4px'}
            {...theme.fontRegular}
          >
            {item?.message ?? ''}
          </CustomText>
          {item?.upload_pic_video && item?.upload_pic_video?.length > 0 && (
            <View
              style={{
                width: item?.upload_pic_video.length * 54 + 25,
                backgroundColor: '#F2F2F2',
                // paddingHorizontal: 12,
                borderRadius: 8,
                paddingVertical: 8,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {item?.upload_pic_video &&
                item?.upload_pic_video?.length > 0 &&
                item?.upload_pic_video.map((it, index) =>
                  renderMediaFiles(it, index)
                )}
              <TouchableOpacity onPress={() => downloadDocument(item)}>
                <Image
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                  source={ArrowBottomRightDownload}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        ...NotchArea.AndroidSafeArea,
      }}
    >
      {refreshing ? <Spinner color={Colors.Black} /> : null}
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Support'}
      />

      {/* // Chat  */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={scrollRef}
          data={adminChat}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchSingleSupportTicket}
            />
          }
          renderItem={renderItem}
        />
        {/* Send Message */}

        {adminChat && adminChat.length > 0 && adminChat[0]?.status === 'Pending'
          ? renderSendMessageView()
          : null}
      </View>

      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => selectImage(text)}
      />
    </SafeAreaView>
  );
};

export default SupportDetail;

const styles = StyleSheet.create({});
