import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Share,
  FlatList,
} from 'react-native-web';
import React, { useState, useCallback, useRef } from 'react';
import { mxHeight, mxWidth } from '../../Util';
import {
  messageIcon,
  shareIcon,
  moreIcon,
  thumbsUpIcon,
  ActivethumbsUpIcon,
  EyeClose,
  CancelFilled,
  ReportFlag,
  BlockUser,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { dummyImage, dummyPost } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import ViewComments from '../../Screen/ViewComments';
import MoreModal from './more/index.web';
import Type from '../../Constants/Type/type';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';
import CustomMoreComponentWeb from './more/index.web';
import DontSeePostWeb from '../../Screen/More/DontSeePost/index.web';
import CustomConfirmationWebModal from '../CustomConfirmationModal/index.web';
import { unFollowUserAction } from '../../Redux/actions/profileAction';
import { setLoading } from '../../Redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { blockuser } from '../../Redux/actions/homeAction';
import Emitter from '../../Util/eventEmitter';

const FeedWeb = ({
  item,
  onLike,
  onComment,
  onHide,
  userId,
  onSubmitComment,
  navigation,
  onUserProfile,
  window,
  setUpdate,
}) => {
  const [isSeePost, setSeePost] = useState(false);
  const [isReportPost, setReportPost] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hideModal, sethideModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [hideType, setHideType] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showPostHide, setShowPostHide] = useState(false);
  const [numberOfLine, setNumberOfLine] = useState(0);
  const toolTipRef = useRef(null);
  var date = new Date(item?.created_at);
  var formatted = moment(date).format('D MMMM YYYY');
  const dispatch = useDispatch();

  const [seePostData, setSeePostData] = useState([
    {
      id: 1,
      title: Strings.MORE.WHY_DONT_SEE,
      type: Type.REPORT.TITLE,
    },
    {
      id: 2,
      title: Strings.MORE.YOUR_FEEDBACK_WILL_HELP_US,
      type: Type.REPORT.SUBTITLE,
    },
    {
      id: 3,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_AUTHOR,
    },
    {
      id: 4,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_TOPIC,
    },
    {
      id: 5,
      title: Strings.FEEDBACK_POST.I_SEEN_TOO_SAME_POST,
    },
    {
      id: 6,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_AUTHOR,
    },
    {
      id: 7,
      title: Strings.FEEDBACK_POST.I_SEEN_POST_BEFORE,
    },
    {
      id: 8,
      title: Strings.FEEDBACK_POST.OLD_POST,
    },
    {
      id: 9,
      title: Strings.FEEDBACK_POST.SOMETHING_ELSE,
    },
    {
      id: 10,
      title: Strings.FEEDBACK_POST.IF_THINK_THIS_GOES_AGAINST_PROFESSION,
      type: Type.REPORT.NOTE,
    },
    {
      id: 11,
      title: Strings.FEEDBACK_POST.REPORT_THIS_POST,
      type: Type.REPORT.REPORT_POST,
    },
  ]);

  const [reportData, setReportData] = useState([
    {
      id: 1,
      title: Strings.MORE.WHY_ARE_YOU_REPORTING_THIS,
      type: Type.REPORT.TITLE,
    },
    {
      id: 2,
      title: Strings.MORE.WHY_ARE_YOU_REPORTING_THIS_DESC,
      type: Type.REPORT.SUBTITLE,
    },
    {
      id: 3,
      title: Strings.REPORT_POST.SUSPICIOUS_SPAM_FAKE,
      type: Type.REPORT.OPTION,
    },
    {
      id: 4,
      title: Strings.REPORT_POST.HATEFUL_SPEECH,
      type: Type.REPORT.OPTION,
    },
    {
      id: 5,
      title: Strings.REPORT_POST.PHYSICAL_HARM,
      type: Type.REPORT.OPTION,
    },
    {
      id: 6,
      title: Strings.REPORT_POST.ADULT_CONTENT,
      type: Type.REPORT.OPTION,
    },
    {
      id: 7,
      title: Strings.REPORT_POST.DEFAMATION,
      type: Type.REPORT.OPTION,
    },
  ]);

  const [moreData, setMoreData] = useState([
    {
      title: Strings.MORE.I_DONT_WANT_TO_SEE_POST,
      icon: EyeClose,
    },
    {
      title: `${Strings.MORE.UNFOLLOW} ${item?.user?.name}`,
      icon: CancelFilled,
    },
    {
      title: Strings.MORE.REPORT_POST,
      icon: ReportFlag,
    },
    {
      title: Strings.MORE.BLOCK_USER,
      icon: BlockUser,
    },
  ]);

  function empty(str) {
    if (
      typeof str == 'undefined' ||
      !str ||
      str.length === 0 ||
      str === '' ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g, '') === ''
    ) {
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
            setShowMore(false);
            dispatch(setLoading(false));
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            setUpdate({ type: true, name: item?.user?.name });
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
          setShowMore(false);
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          setUpdate({ type: true, name: item?.user?.name });
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderMoreItem = ({ item, index }) => {
    return (
      <CustomMoreComponentWeb
        window={window}
        data={item}
        onClick={() => {
          switch (index) {
            case 0: {
              setShowMore(false);
              setSeePost(true);
              break;
            }
            case 1: {
              setShowMore(false);
              setShowUnfollow(true);
              setModalType(Type.MORE.UNFOLLOW);
              break;
            }
            case 2: {
              setShowMore(false);
              setReportPost(true);
              break;
            }
            case 3: {
              setShowMore(false);
              setShowUnfollow(true);
              setModalType(Type.MORE.BLOCK);
              break;
            }
          }
        }}
      />
    );
  };

  let isId = item?.like.findIndex((element) => element.user_id == userId);

  return (
    <View
      style={{
        paddingVertical: 12,
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteName.POST_DETAILS, { postData: item });
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {/* // User Avatar */}
          <View
            style={{
              borderRadius: mxWidth * 0.2,
              height: '8vh',
              width: '8vh',
              borderColor: Colors.yellow[400],
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                height: '8vh',
                width: '8vh',
                borderRadius: mxWidth * 0.2,
              }}
              source={
                item?.user?.image
                  ? { uri: EndPoint.baseAssestURL + item?.user?.image }
                  : dummyImage
              }
            />
          </View>
          {/* // User Info */}
          <View style={{ justifyContent: 'space-around', paddingLeft: 12 }}>
            <Text
              style={{ ...theme.fontBold, fontSize: 15, color: Colors.Black }}
            >
              {' '}
              {item?.user?.name || ''}
            </Text>
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: 12,
                color: Colors.CodGray,
              }}
            >
              {item?.user?.skill || ''}
            </Text>
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: 11,
                color: Colors.CodGray,
              }}
            >
              {formatted}
            </Text>
          </View>
        </View>
        {/* // User feed */}
        <View
          style={{
            paddingVertical: 12,
            paddingRight: 12,
          }}
        >
          <Text
            numberOfLines={showMore ? undefined : 3}
            style={{
              ...theme.fontRegular,
              fontSize: 12,
              color: Colors.CodGray,
            }}
          >
            {item?.description || ''}
          </Text>
        </View>
        {!empty(item?.media) && (
          <View
            style={{
              width: '100%',
              height: '33vh',
              borderRadius: 12,
            }}
          >
            <Image
              style={{ width: '100%', height: '33vh', borderRadius: 12 }}
              resizeMode={'contain'}
              source={
                item?.media
                  ? { uri: EndPoint.baseAssestURL + item?.media }
                  : dummyPost
              }
            />
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
            {/* 3 Shares */}
            {item?.share ? `${item?.share} Share` : `${0} Share`}
          </Text>
        </View>
        <View style={{ backgroundColor: '#777E90', height: 0.4 }} />
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 12,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
              onPress={() => {
                setShowComments(!showComments);
              }}
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
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  const shareOptions = {
                    title: item?.description || '',
                    failOnCancel: false,
                    urls: [EndPoint.baseAssestURL + item?.user?.image],
                  };
                  Share.share({
                    message: item?.description || '',
                    url: EndPoint.baseAssestURL + item?.user?.image,
                    title: item?.description || '',
                  })
                    .then((result) => console.log(result))
                    .catch((errorMsg) => console.log(errorMsg));
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
              {item?.user_id !== userId && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 12,
                  }}
                  onPress={() => {
                    if (item?.user_id !== userId) {
                      setShowMore(!showMore);
                    }
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: 22, width: 22 }}
                    source={moreIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            {showMore && (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  shadowColor: Colors.gray2,
                  backgroundColor: Colors.White,
                  padding: 20,
                  overflow: 'hidden',
                  shadowRadius: 20,
                  shadowOpacity: 1,
                  borderRadius: 10,
                  flexDirection: 'column',
                }}
              >
                <FlatList
                  bounces={false}
                  data={moreData}
                  renderItem={renderMoreItem}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {showComments && (
        <ViewComments
          comments={item?.comment}
          onSubmitComment={(postId, textDescription, tagUser) =>
            onSubmitComment({ postId: item?._id, textDescription, tagUser })
          }
          onUserProfile={onUserProfile}
        />
      )}

      {isSeePost ||
        (isReportPost && (
          <DontSeePostWeb
            showSeePost={isSeePost || isReportPost}
            setShowSeePost={() => {
              setSeePost(false);
              setReportPost(false);
              setShowMore(false);
            }}
            setPostResult={(value) => {
              setShowMore(false);
              setUpdate({ type: isSeePost, name: item?.user?.name });
            }}
            postData={item}
            isSeePost={isSeePost ? true : false}
            data={isSeePost ? seePostData : reportData}
            title={isSeePost ? Strings.MORE.DONT_SEE_POST : Strings.MORE.REPORT}
          />
        ))}

      <CustomConfirmationWebModal
        isModal={showUnfollow}
        setModal={(value) => {
          setShowUnfollow(false);
          setShowMore(false);
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
export default FeedWeb;
