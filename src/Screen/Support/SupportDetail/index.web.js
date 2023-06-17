import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import Strings from '../../../Resources/Strings';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import {
  headerLogo,
  AddMediaSupportIcon,
  SendSupportMessageIcon,
  ic_leftBackIcon,
} from '../../../Resources/assets';
import { RouteName } from '../../../Navigation/routeName';
import { useRef } from 'react';
import { useState } from 'react';
import { setLoading } from '../../../Redux/actions/authAction';
import {
  fetchSingleSupportTicketChat,
  sendMessageSupport,
} from '../../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../../Redux/constants/EndPoint';
import moment from 'moment';

import { uploadImage } from '../../../Redux/actions/homeAction';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../../Redux/services/profileService';
import fileDownload from 'js-file-download';
import axios from 'axios';
import { ArrowBottomRightDownload } from '../../../Resources/assets';

const SupportDetail = ({ navigation, route }) => {
  const scrollRef = useRef(null);
  const [userImage, setuserImage] = useState('');
  const [adminChat, setAdminChat] = useState([]);
  const [localeFile, setLocaleFile] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [mediaImage, setMediaImage] = useState('');

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
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
          dispatch(setLoading(false));
          setRefreshing(false);
        },
      })
    );
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
            dispatch(setLoading(false));
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
  // for image upload
  var selectItem = '';
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      selectItem == 'pdf'
        ? { 'text/pdf': ['.pdf'] }
        : { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: async (acceptedFiles) => {
      try {
        let imageFile = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        dispatch(setLoading(true));
        var getImageURI = await imageUplaod({
          file: imageFile[0],
          token: userData?.access_token,
        });
        dispatch(setLoading(false));
        if (selectItem == 'pdf') {
          dispatch(setLoading(false));
          setLocaleFile(getImageURI.data[0]);
        } else {
          dispatch(setLoading(false));
          setuserImage(getImageURI.data[0]);
        }
      } catch (err) {
        dispatch(setLoading(false));
      }
    },
  });

  const renderMediaFiles = (it, index) => {
    return (
      <View style={{ paddingHorizontal: 5 }} key={`index${index}`}>
        <Image
          style={{ height: 44, borderRadius: 12, width: 44 }}
          source={{ uri: EndPoint.baseAssestURL + it }}
        />
      </View>
    );
  };
  const downloadDocument = (data) => {
    data?.upload_pic_video.map((it, index) => {
      var type = type == 'image' || '.png';
      var url = `${EndPoint.baseAssestURL}${it}`;
      console.log('url>>>>', url, it);
      fileDownload('GET', url, {
        responseType: 'blob',
      })
        .then((res) => {
          fileDownload(res.data, `'file.jpg',file.png`);
          console.log('res>>>123', res);
          alert('download successfully');
        })
        .catch((error) => {
          console.log('err>>>123', error);
        });
    });
    // }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={style.renderContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={style.imageContainer}>
            <Image
              source={
                item?.is_type && item?.is_type === 'Admin'
                  ? headerLogo
                  : myProfile?.image
                  ? { uri: EndPoint.baseAssestURL + myProfile?.image }
                  : myProfile?.userinfo?.image
                  ? { uri: EndPoint.baseAssestURL + myProfile?.userinfo.image }
                  : headerLogo
              }
              style={style.icon}
            />
          </View>
          <View style={style.textContainer}>
            <View>
              <Text style={style.ticketNoText}>
                {item?.ticket_number || ''}
              </Text>
              <Text style={style.nameText}>
                {' '}
                {item?.is_type && item?.is_type === 'Admin'
                  ? 'Admin'
                  : myProfile?.name || ''}
              </Text>
              <Text style={style.timeText}>
                {' '}
                {`${moment(item?.created_at ?? '').format(
                  'MMMM DD, YYYY'
                )} | ${moment(item?.created_at ?? '').format('hh:mm a')}`}
              </Text>
            </View>
            <Text
              style={[
                style.statusText,
                {
                  color:
                    item?.status === 'Pending'
                      ? Colors.OrangeColor
                      : Colors.GreenColor,
                },
              ]}
            >
              {' '}
              {item?.status || ''}
            </Text>
          </View>
        </View>
        <View style={style.renderBottomTextContainer}>
          <Text style={style.detailText}> {item?.message ?? ''}</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 16 }}>
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
    <View style={style.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '4%',
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={ic_leftBackIcon}
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
            marginRight: '2%',
          }}
        />
        <Text style={style.mainText}>{Strings.SUPPORT}</Text>
      </TouchableOpacity>

      {/* re */}
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
      </View>

      <View style={{ paddingVertical: 8, backgroundColor: Colors.White }}>
        {mediaImage !== '' && (
          <View style={{ paddingHorizontal: 16 }}>
            <Image
              // resizeMode="contain"
              style={{ height: 44, width: 44 }}
              source={{ uri: mediaImage }}
            />
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
          <div
            {...getRootProps({
              className: 'dropzone',
              // onClick: (event) => {
              //   setIsLocal(false);
              // },
            })}
          >
            <input {...getInputProps()} />
            <TouchableOpacity
              disabled
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
          </div>

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

                paddingHorizontal: 8,
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
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '15%',
    paddingTop: '6%',
  },
  mainText: {
    fontSize: fontResize(22),
    color: Colors.Black,
    fontWeight: 'bold',
  },
  renderContainer: {
    flex: 1,
    width: '70%',
    height: '100%',
    padding: '2%',
    borderRadius: 20,
    marginBottom: '4%',
    backgroundColor: Colors.White,
    alignSelf: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: '2%',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: Colors.blue[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  ticketNoText: {
    fontSize: fontResize(13),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: fontResize(12),
    color: Colors.DimGray,
    textTransform: 'capitalize',
    marginTop: 6,
  },
  renderBottomTextContainer: {
    marginTop: '2%',
    marginLeft: '1.5%',
  },
  detailText: {
    fontSize: fontResize(11),
    fontWeight: '200',
    color: Colors.gray,
  },
  statusText: {
    fontSize: fontResize(16),
    fontWeight: '600',
  },
  btn: {
    height: '10%',
    width: '30%',
    borderRadius: 10,
    marginTop: '4%',
    marginLeft: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue[300],
  },
  nameText: {
    fontSize: fontResize(16),
    marginTop: '4%',
  },
  btnText: {
    fontSize: fontResize(16),
    color: Colors.White,
  },
});

export default SupportDetail;
