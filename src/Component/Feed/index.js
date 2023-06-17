import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { mxHeight, mxWidth } from '../../Util';
import {
  messageIcon,
  shareIcon,
  moreIcon,
  thumbsUpIcon,
  ActivethumbsUpIcon,
  UserPlaceholder,
  PostPlaceholder,
  STAR_ICON,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { dummyPost } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import Share from 'react-native-share';
import HidePost from '../HidePost';
import FastImage from 'react-native-fast-image';
import { fontResize } from '../../Util/font';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';
import SingleLineText from '../SingleLineView';
import RBSheet from 'react-native-raw-bottom-sheet';
import Type from '../../Constants/Type/type';
import CustomConfirmationModal from '../CustomConfirmationModal';
import { unFollowUserAction } from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { blockuser, deletePostAction } from '../../Redux/actions/homeAction';
import Emitter from '../../Util/eventEmitter';
import { updateBlockFirebaseChatList } from '../../Constants/FireStoremanager/FireStoremanager';
import UnlockFullAccess from '../UnlockFullAccess';
import Tooltip from 'rn-tooltip';

const Feed = ({
  item,
  onLike,
  onComment,
  onHide,
  userId,
  onUserProfile,
  onShare,
  jobs,
  event,
  index,
  navigation,
  setUpdate,
  window,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [showPostHide, setShowPostHide] = useState(false);
  const [numberOfLine, setNumberOfLine] = useState(0);
  const toolTipRef = useRef(null);

  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const onTextLayout = useCallback((e) => {
    setNumberOfLine(e.nativeEvent.lines.length);
  }, []);
  const refRBSheet = useRef();

  function formatDate(str) {
    return moment(str, 'YYYY-MM-DD HH:mm:ss Z').local().format('MMMM DD, YYYY');
  }

  function formatTime(str) {
    return moment(str, 'YYYY-MM-DD HH:mm:ss Z').local().format('hh:mm A');
  }

  var date = new Date(item?.created_at);
  var formatted = moment(date).format('D MMMM YYYY');

  let isId = item?.like.findIndex((element) => element.user_id == userId);

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RouteName.JOB_DETAIL, { eventId: item._id });
          }}
          style={{
            width: mxWidth * 0.65,
            paddingHorizontal: mxWidth * 0.025,
            borderRadius: 10,
            flexDirection: 'row',
            paddingVertical: mxHeight * 0.03,
            justifyContent: 'space-between',
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 3,

            backgroundColor: '#FDFEFF',
            shadowRadius: 5,
            shadowOpacity: 0.2,
          }}
        >
          <View
            style={{
              height: mxWidth * 0.12,
              width: mxWidth * 0.12,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.fill}
              style={{
                height: mxWidth * 0.15,
                width: mxWidth * 0.15,
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              defaultSource={PostPlaceholder}
              source={
                item?.company_logo
                  ? {
                      uri: EndPoint.baseAssestURL + item?.company_logo,
                      priority: FastImage.priority.high,
                    }
                  : PostPlaceholder
              }
            />
          </View>

          <View style={{ paddingHorizontal: 15, width: '90%' }}>
            <Text
              style={{
                ...theme.fontSemiBold,
                fontSize: fontResize(13),
                color: Colors.Black,
              }}
            >
              {item && item?.job_title}
            </Text>
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: fontResize(12),
                paddingVertical: 8,
                color: Colors.Black,
              }}
            >
              {item && item?.company_name}
            </Text>

            <View
              style={{
                width: '40%',
                backgroundColor: Colors.background,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginTop: 8,
                height: 26,
              }}
            >
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 10,
                  paddingHorizontal: 8,
                  color: Colors.Black,
                }}
              >
                {item && item?.job_type}
              </Text>
            </View>

            <View style={{ alignSelf: 'flex-end', marginEnd: 5, marginTop: 8 }}>
              <Text
                style={{ ...theme.fontRegular, fontSize: 12, color: '#99C24D' }}
              >
                {item && item?.salary_range} / {item && item?.salary_period}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  function empty(str) {
    if (str == '') {
      return true;
    } else {
      return false;
    }
  }

  const unfollowUser = () => {
    try {
      dispatch(setLoading(true));
      const params = {
        follower_id: item?.user?._id,
      };
      dispatch(
        unFollowUserAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            Emitter.emit(Type.EMITTER.GET_PROFILE);
            setUpdate();
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

  const blockUser = () => {
    let params = {
      block_user_id: item?.user?._id,
      status: 'block',
    };
    dispatch(
      blockuser({
        params,
        onSuccess: (result) => {
          const blockchatUser = updateBlockFirebaseChatList({
            id: userData.data._id,
            chatUserId: item?.user?._id,
            isBlock: true,
          });
          const blockchatUserOther = updateBlockFirebaseChatList({
            id: item?.user?._id,
            chatUserId: userData.data._id,
            isBlock: false,
          });
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          Emitter.emit(Type.EMITTER.GET_PROFILE);
          setUpdate();
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderEventItem = ({ item }) => {
    return (
      <View
        style={{
          marginEnd: 10,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Job', {
              screen: RouteName.EVENT_DETAIL,
              params: {
                eventId: item._id,
              },
            });
          }}
          style={{
            width: mxWidth * 0.78,
            marginHorizontal: mxWidth * 0.01,
            marginVertical: mxWidth * 0.01,
            borderRadius: 20,
            shadowColor: 'black',

            backgroundColor: '#FDFEFF',
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 3,
          }}
        >
          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <FastImage
              resizeMode={FastImage.resizeMode.fill}
              style={{
                width: '100%',
                height: mxWidth * 0.3,
              }}
              source={
                item?.company_logo
                  ? {
                      uri: EndPoint.baseAssestURL + item?.company_logo,
                      priority: FastImage.priority.high,
                    }
                  : dummyPost
              }
            />

            <View
              style={{
                paddingVertical: 12,
                backgroundColor: Colors.Blueberry,
                paddingHorizontal: 22,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <FastImage
                  resizeMode={FastImage.resizeMode.fill}
                  style={{
                    marginTop: -((mxWidth * 0.14) / 1.6),
                    backgroundColor: Colors.White,
                    borderRadius: 8,
                    width: mxWidth * 0.14,
                    height: mxWidth * 0.14,
                  }}
                  source={
                    item?.company_logo
                      ? {
                          uri: EndPoint.baseAssestURL + item?.company_logo,
                          priority: FastImage.priority.high,
                        }
                      : dummyJob
                  }
                />

                <Text
                  style={{
                    ...theme.fontSemiBold,
                    fontSize: 16,
                    color: Colors.White,
                    paddingHorizontal: 14,
                  }}
                >
                  {item && item?.event_title}
                </Text>
              </View>

              <View style={{ paddingVertical: 8 }}>
                <Text
                  style={{
                    ...theme.fontRegular,
                    fontSize: 12,
                    color: Colors.White,
                  }}
                >
                  {item && item?.job_description}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: Colors.White,
                    alignItems: 'center',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      ...theme.fontRegular,
                      fontSize: 10,
                      color: '#99C24D',
                      padding: 8,
                    }}
                  >
                    `{item && item?.attendees} Attendees`
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: Colors.White,
                    alignItems: 'center',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      ...theme.fontRegular,
                      fontSize: 10,
                      color: '#99C24D',
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                    }}
                  >
                    {formatDate(item?.date)}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: Colors.White,
                    alignItems: 'center',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      ...theme.fontRegular,
                      fontSize: 10,
                      color: '#99C24D',
                      padding: 8,
                    }}
                  >
                    {formatTime(item?.date)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const viewPopup = () => {
    setTimeout(() => {
      setShowUnfollow(true);
    }, 1000);
  };

  const deletePostPopup = () => {
    Alert.alert(Strings.MORE.DELETE_POST, Strings.ARE_YOU_SURE_TO_DELETE_POST, [
      {
        text: 'Yes',
        onPress: () => deletePost(),
      },
      { text: 'No', onPress: () => {} },
    ]);
  };

  const deletePost = () => {
    const { _id } = item;
    dispatch(
      deletePostAction({
        _id,
        onSuccess: (result) => {
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          setUpdate();
          // setPostData(result?.data[0]);
        },
        onError: (error) => {},
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {type == 'Professional' && !userInfo?.profile_subscription && index == 3 && (
        <UnlockFullAccess
          onUnlock={() => {
            navigation.navigate(RouteName.SUBSCRIPTIONS);
          }}
          OnCancel={() => {}}
        />
      )}
      <View style={{ paddingVertical: 5, flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RouteName.POST_DETAILS, { postData: item });
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                borderRadius: mxWidth * 0.2,
                height: mxWidth * 0.18,
                width: mxWidth * 0.18,
                borderColor: Colors.yellow[400],
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <TouchableOpacity
                style={{ borderRadius: mxWidth * 0.2, overflow: 'hidden' }}
                onPress={() => onUserProfile(item?.user_id)}
              >
                <FastImage
                  style={{
                    height: mxWidth * 0.16,
                    width: mxWidth * 0.16,
                    borderRadius: mxWidth * 0.2,
                  }}
                  resizeMode="cover"
                  defaultSource={UserPlaceholder}
                  source={
                    item?.user?.image
                      ? { uri: EndPoint.baseAssestURL + item?.user?.image }
                      : UserPlaceholder
                  }
                />
              </TouchableOpacity>
            </View>
            {/* // User Info */}
            <View style={{ justifyContent: 'space-around', paddingLeft: 12 }}>
              <Text
                onPress={() => onUserProfile(item?.user_id)}
                style={{ ...theme.fontBold, fontSize: 16, color: Colors.Black }}
              >
                {item?.user?.name || ''}{item?.user?.gold_member ? <Image source={STAR_ICON} style={{height: 16, width: 16}}/> : ''}
              </Text>
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 14,
                  color: Colors.CodGray,
                }}
              >
                {item?.user?.skill || ''}
              </Text>
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: Colors.CodGray,
                }}
              >
                {formatted}
              </Text>
            </View>
          </View>
          {/* // User feed */}
          <View style={{ paddingVertical: 12 }}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={showMore ? undefined : 3}
              style={{
                ...theme.fontRegular,
                fontSize: 15,
                color: Colors.CodGray,
              }}
            >
              {item?.description || ''}
            </Text>
            {numberOfLine >= 3 && (
              <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={{ color: Colors.Blueberry }}>
                  {!showMore ? '...See More' : '...See Less'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {!empty(item?.media) && (
            <View
              style={{
                height: mxWidth * 0.6,
                borderRadius: 12,
                width: mxWidth - 24,
              }}
            >
              {typeof item?.media == 'string' ? (
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: mxWidth * 0.6,
                    resizeMode: 'contain',
                  }}
                  defaultSource={PostPlaceholder}
                  source={
                    item?.media
                      ? {
                          uri: EndPoint.baseAssestURL + item?.media,
                          priority: FastImage.priority.high,
                        }
                      : PostPlaceholder
                  }
                />
              ) : (
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: mxWidth * 0.6,
                    resizeMode: 'contain',
                  }}
                  defaultSource={PostPlaceholder}
                  source={
                    item?.media[0].type == 'image'
                      ? {
                          uri: EndPoint.baseAssestURL + item?.media[0].file,
                          priority: FastImage.priority.high,
                        }
                      : item?.media[0].type == undefined
                      ? item?.media[0]
                        ? {
                            uri: EndPoint.baseAssestURL + item?.media[0],
                            priority: FastImage.priority.high,
                          }
                        : PostPlaceholder
                      : PostPlaceholder
                  }
                />
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 12,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#777E90',
                }}
              >
                {item?.likes ? `${item?.likes || ''} Likes` : 'No Likes'}
              </Text>

              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#777E90',
                  paddingHorizontal: 12,
                }}
              >
                {item?.comment && item?.comment?.length === 0
                  ? 'No Comment'
                  : `${item?.comment?.length || ''} Comments`}
              </Text>
            </View>
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: 12,
                color: '#777E90',
              }}
            >
              {item?.share
                ? item?.share == 1
                  ? `1 share`
                  : `${item?.share} Shares`
                : '0 Share'}
            </Text>
          </View>
        </TouchableOpacity>
        <SingleLineText backgroundColor={Colors.PrimaryGray1} height={0.5} />

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 12,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => onLike(item?._id)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
                source={isId == -1 ? thumbsUpIcon : ActivethumbsUpIcon}
              />
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#777E90',
                  paddingLeft: 6,
                }}
              >
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onComment(item?.comment, item?._id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 12,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
                source={messageIcon}
              />
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#777E90',
                  paddingLeft: 6,
                }}
              >
                Comment
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                const shareOptions = {
                  title: item?.description || '',
                  failOnCancel: false,
                  urls: [EndPoint.baseAssestURL + item?.user?.image],
                  message: encodeURI(item?.description || ''),
                };
                Share.open(shareOptions)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    err && console.log(err);
                  });
                onShare(item?._id);
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
                source={shareIcon}
              />
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#777E90',
                  paddingLeft: 6,
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
            {item?.user_id !== userId ? (
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: 22, width: 22 }}
                    source={moreIcon}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <Tooltip
                ref={toolTipRef}
                withPointer={false}
                popover={
                  <Text
                    onPress={() => {
                      toolTipRef.current.toggleTooltip();
                      deletePostPopup();
                    }}
                    style={{
                      color: Colors.DimGray,
                      fontSize: fontResize(18),
                      fontFamily: 'Gilroy-Bold',
                    }}
                  >
                    {Strings.MORE.DELETE_POST}
                  </Text>
                }
                width={mxWidth * 0.3}
                height={50}
                overlayColor="rgba(78, 138, 190,0)"
                containerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  alignItems: 'center',
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: mxHeight * 0.03,
                  marginLeft: mxWidth * 0.02,
                }}
                pointerColor={{
                  backgroundColor: 'clear',
                }}
                // pointerStyle={{ backgroundColor: "red" }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: 22, width: 22 }}
                    source={moreIcon}
                  />
                </View>
              </Tooltip>
            )}
          </View>
        </View>
      </View>

      {type == 'Professional' && index == 4 && (
        <View style={{ width: '100%', paddingVertical: '2%' }}>
          {jobs?.data?.Featured_Jobs != undefined &&
            jobs?.data?.Featured_Jobs.length !== 0 && (
              <Text
                style={{
                  ...theme.fontBold,
                  fontSize: 18,
                  color: 'black',
                  padding: 6,
                  marginStart: 5,
                }}
              >
                {Strings.FEATURED_JOB}
              </Text>
            )}

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            bounces={false}
            data={jobs?.data?.Featured_Jobs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          {event?.data !== undefined && event?.data.length !== 0 && (
            <Text
              style={{
                ...theme.fontBold,
                fontSize: 18,
                color: 'black',
                padding: 6,
                marginStart: 5,
              }}
            >
              {Strings.EVENTS}
            </Text>
          )}

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            bounces={false}
            data={event?.data}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {type == 'Professional' &&
        !userInfo?.profile_subscription &&
        (index + 4) % 15 == 0 && (
          <UnlockFullAccess
            onUnlock={() => {
              navigation.navigate(RouteName.SUBSCRIPTIONS);
            }}
            OnCancel={() => {}}
          />
        )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
          },
          container: {
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <HidePost
          userName={item?.user?.name || ''}
          onClick={(value) => {
            refRBSheet.current?.close();
            switch (value) {
              case Type.MORE.I_DONT_WANT_TO_SEE_POST: {
                navigation.navigate(RouteName.DONT_SEE_POST, {
                  item: item,
                  type: Type.REPORT.DONT_SEE_POST,
                });
                break;
              }
              case Type.MORE.REPORT_POST: {
                navigation.navigate(RouteName.REPORT_POST, {
                  item: item,
                  type: Type.REPORT.REPORT_POST,
                });
                break;
              }
              case Type.MORE.UNFOLLOW: {
                setModalType(Type.MORE.UNFOLLOW);
                viewPopup();
                break;
              }
              case Type.MORE.BLOCK: {
                setModalType(Type.MORE.BLOCK);
                viewPopup();
                break;
              }
            }
          }}
        />
      </RBSheet>

      <CustomConfirmationModal
        isModal={showUnfollow}
        setModal={(value) => {
          setShowUnfollow(false);
        }}
        setSelection={(value) => {
          if (value == Type.CONFIRMATION.YES) {
            modalType == Type.MORE.UNFOLLOW ? unfollowUser() : blockUser();
          }
        }}
        data={
          modalType == Type.MORE.UNFOLLOW
            ? {
                title: Strings.UNFOLLOW_TITLE,
                desc: `${Strings.ARE_YOU_SURE_TO_UNFOLLOW} ${
                  item?.user?.name || ''
                }?`,
              }
            : {
                title: Strings.BLOCK_TITLE,
                desc: `${Strings.ARE_YOU_SURE_TO_BLOCK} ${
                  item?.user?.name || ''
                }?`,
              }
        }
      />
    </View>
  );
};
export default Feed;
