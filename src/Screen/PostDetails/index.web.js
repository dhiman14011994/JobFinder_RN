import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

import Colors from '../../Resources/Colors';
import style from './style';
import PostUserDetails from '../../Component/PostUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import PostDescription from '../../Component/PostDescription';
import PostLikeCommentView from '../../Component/PostLikeCommentView';
import SingleLineText from '../../Component/SingleLineView';
import LikeCommentButton from '../../Component/LikeCommentButton';
import Strings from '../../Resources/Strings';
import {
  blockuser,
  commentPost,
  getPostDetails,
  hideAllPost,
  likePost,
  sharePost,
} from '../../Redux/actions/homeAction';
import CommentsView from '../../Component/commentsView';
import Emitter from '../../Util/eventEmitter';
import CustomTagView from '../../Component/CustomTagView';
import ProfileDetail from '../../Component/ProfileDetail/index.web';
import {
  fetchOtherProfile,
  unFollowUserAction,
} from '../../Redux/actions/profileAction';
import DontSeePostWeb from '../More/DontSeePost/index.web';
import CustomMoreComponentWeb from '../../Component/Feed/more/index.web';
import {
  BlockUser,
  CancelFilled,
  EyeClose,
  ReportFlag,
} from '../../Resources/assets';
import { fontResize } from '../../Util/font';
import Type from '../../Constants/Type/type';
import { mxWidth } from '../../Util';
import CustomConfirmationModal from '../../Component/CustomConfirmationModal';
import { setLoading } from '../../Redux/actions/authAction';

var textLength = 0;

const PostDetails = ({ navigation, route }) => {
  const userData = useSelector((state) => state.auth.userData);
  const allUsers = useSelector((state) => state.profile.allUser);
  const postData = useSelector((state) => state.home.postDetails);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [uId, setUid] = useState('');
  const [lastValue, setLastValue] = useState('');
  const [tagValue, setTagValue] = useState([]);
  const [istag, setTag] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [tagUser, setTagUser] = useState([]);
  const [showProfileModal, setProfileModal] = useState(false);
  const [isSeePost, setSeePost] = useState(false);
  const [isReportPost, setReportPost] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [modalType, setModalType] = useState('');
  const window = useWindowDimensions();
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const moreData = [
    {
      title: Strings.MORE.I_DONT_WANT_TO_SEE_POST,
      icon: EyeClose,
    },
    {
      title: `${Strings.MORE.UNFOLLOW} ${route.params.postData?.user?.name}`,
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
  ];

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

  var inputRef = useRef(null);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = () => {
    const { _id } = route?.params?.postData;
    dispatch(
      getPostDetails({
        _id,
        onSuccess: (result) => {
          console.log('result>>>', result.data);
        },
        onError: (error) => {},
      })
    );
  };

  const hidePost = (type, userId, postId) => {
    let params = {
      post_id: route?.params?.postData._id,
      post_user_id: userId,
      type: type,
    };
    dispatch(
      hideAllPost({
        params,
        onSuccess: (result) => {
          fetchPostData();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
        },
        onError: (error) => {},
      })
    );
  };

  const onLike = (post_id) => {
    dispatch(
      likePost({
        post_id,
        onSuccess: (result) => {
          fetchPostData();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
        },
        onError: (error) => {},
      })
    );
  };

  const onShare = (post_id) => {
    dispatch(
      sharePost({
        post_id,
        onSuccess: (result) => {
          fetchPostData();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
        },
        onError: (error) => {},
      })
    );
  };

  const unfollowUser = () => {
    try {
      dispatch(setLoading(true));
      const params = {
        follower_id: route?.params?.postData?.user?._id,
      };
      dispatch(
        unFollowUserAction({
          params,
          onSuccess: (result) => {
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            navigation.goBack();
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

  const blockUser = () => {
    try {
      dispatch(setLoading(true));
      let params = {
        block_user_id: route?.params?.postData?.user?._id,
        status: 'block',
      };
      dispatch(
        blockuser({
          params,
          onSuccess: (result) => {
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            navigation.goBack();
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

  const renderMoreItem = ({ item, index }) => {
    return (
      <CustomMoreComponentWeb
        window={window}
        data={item}
        onClick={() => {
          switch (index) {
            case 0: {
              setReportPost(false);
              setSeePost(true);
              break;
            }
            case 1: {
              setShowUnfollow(true);
              setModalType(Type.MORE.UNFOLLOW);
              break;
            }
            case 2: {
              setSeePost(true);
              setReportPost(true);
              break;
            }
            case 3: {
              setShowUnfollow(true);
              setModalType(Type.MORE.BLOCK);
              break;
            }
          }
        }}
      />
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={{}}>
        <PostUserDetails
          item={postData || route.params.postData}
          onUserProfile={(id) => {
            onUserProfile(id);
          }}
          window={window}
        />
        <PostDescription userData={userData} item={postData} window={window} />
        <PostLikeCommentView item={postData} window={window} />
        <SingleLineText backgroundColor={Colors.PrimaryGray1} height={0.5} />

        <View>
          <LikeCommentButton
            item={postData}
            onComment={() => {}}
            onLike={() => {
              onLike(postData?._id);
            }}
            onHide={(type, userId, postId) => {
              hidePost(type, userId, postId);
            }}
            onShare={(id) => {
              onShare(postData?._id);
            }}
            userId={userData?.data?._id || '456123'}
            SeeMoreDetails={() => setShowMore(!showMore)}
          />
          {showMore && (
            <View
              style={{
                alignSelf: 'center',
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
                marginLeft: mxWidth * 0.65,
                // position: 'absolute',
                // right: 0,
                // top: window.height * 0.08,
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

        {postData?.comment &&
          postData?.comment?.map((item) => (
            <CommentsView
              item={item}
              onUserProfile={(id) => onUserProfile(id)}
            />
          ))}
        {isSeePost && (
          <DontSeePostWeb
            showSeePost={isSeePost}
            setShowSeePost={() => {
              setSeePost(false);
              setReportPost(false);
              setShowMore(false);
            }}
            setPostResult={(value) => {
              setShowMore(false);
              // setUpdate({
              //   type: !isReportPost,
              //   name: route.params.postData?.user?.name,
              // });
            }}
            postData={route.params.postData}
            isSeePost={!isReportPost ? true : false}
            data={!isReportPost ? seePostData : reportData}
            title={
              !isReportPost ? Strings.MORE.DONT_SEE_POST : Strings.MORE.REPORT
            }
          />
        )}
        {showUnfollow && (
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
                      route.params.postData?.user?.name || ''
                    }?`,
                  }
                : {
                    title: Strings.BLOCK_TITLE,
                    desc: `${Strings.ARE_YOU_SURE_TO_BLOCK} ${
                      route.params.postData?.name || ''
                    }?`,
                  }
            }
          />
        )}
      </View>
    );
  };

  const onChangeText = (text) => {
    if (text.length == 1 && text == '@') {
      setTag(true);
      textLength = text.length;
      setTagValue(allUsers || []);
    } else if (
      text.charAt(text.length - 1) == '@' &&
      text.charAt(text.length - 2) == ' '
    ) {
      textLength = text.length;
      setTag(true);
      const before_ = text.substring(0, text.length - 1);
      setLastValue(before_);
      setTagValue(allUsers || []);
    } else if (istag) {
      var afterChar = text.slice(textLength);
      var tagData = allUsers || [];
      const filteredArr = tagData.filter((val) =>
        val.name.toLowerCase().includes(afterChar)
      );
      setTagValue(filteredArr);
    }

    if (
      text.charAt(text.length - 1) !== '@' ||
      text.charAt(text.length - 2) !== ' '
    ) {
      var newCommentText = `${commentText}${text.charAt(text.length - 1)}`;
      if (!istag) {
        setCommentText(newCommentText);
      }
    }

    if (text.length == 0) {
      setTag(false);
    }
    setValue(text);
  };

  const renderItem = ({ item, index }) => {
    return (
      <CustomTagView
        item={item}
        index={index}
        addTagData={() => addTagData({ item })}
      />
    );
  };

  const addTagData = ({ item }) => {
    setValue('');
    let newText = `${lastValue} @${item.name} `;
    let newCommenttagText = `${commentText} [${item.name}](${item._id}) `;
    setValue(newText);
    setCommentText(newCommenttagText);
    setTag(false);
    inputRef.current.focus();
    var oldTagValue = tagUser;
    var checkIndex = oldTagValue.findIndex(
      (element) => element.user_id == item._id
    );
    if (checkIndex == -1) {
      oldTagValue.push({ user_id: item._id, name: item.name });
      setTagUser(oldTagValue);
    }
  };

  const onComment = () => {
    let params = {
      post_id: route?.params?.postData._id,
      comment: value,
      tagged_users: tagUser,
    };
    dispatch(
      commentPost({
        params,
        onSuccess: (result) => {
          setValue('');
          setCommentText('');
          setTagUser([]);
          fetchPostData();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
        },
        onError: (error) => {},
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == 'Backspace') {
      const lastWord = value.split(' ').splice(-1);
      if (lastWord[0] == '') {
        setTag(false);
      }
    }
  };

  const onUserProfile = (id) => {
    if (id !== userData.data._id) {
      setUid(id);
      setProfileModal(true);
      fetchOtherUserProfile(id);
    }
  };

  const fetchOtherUserProfile = (item) => {
    const userId = item;
    dispatch(
      fetchOtherProfile({
        userId,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  return (
    <View style={style.webContainer}>
      <View
        style={{
          backgroundColor: Colors.White,
          height: window.height * 0.6,
        }}
      >
        {istag ? (
          <View style={{ height: window.height * 0.8 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={tagValue}
              renderItem={renderItem}
              ListFooterComponent={() => {
                return <View style={{ height: window.height * 0.2 }} />;
              }}
            />
          </View>
        ) : (
          <View style={{ height: window.height * 0.8 }}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View>
                {listHeaderComponent()}
                <View style={{ height: window.height * 0.2 }} />
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      <View
        style={[
          { justifyContent: 'center', backgroundColor: Colors.White },
          {
            position: 'absolute',
            bottom: '5%',
            height: '8%',
            width: window.width * 0.8,
          },
        ]}
      >
        <View style={[style.textWebVwCntnr]}>
          <View style={style.inoutVw}>
            <TextInput
              ref={inputRef}
              multiline={true}
              style={[
                {
                  outlineColor: 'white',
                  marginLeft: 2,
                  width: '100%',
                  color: Colors.Black,
                  borderColor: Colors.Gray,
                  height: window.height * 0.025,
                  paddingLeft: '5%',
                  fontSize: fontResize(window.height * 0.018),
                  backgroundColor: Colors.White,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlignVertical: 'center',
                },
              ]}
              onChangeText={(text) => {
                onChangeText(text);
              }}
              onFocus={() => {}}
              onKeyPress={handleKeyDown}
              placeholder={'Type a message.....'}
              placeholderTextColor={'#000000'}
              underlineColorAndroid="transparent"
              value={value}
            />
          </View>
          <View
            style={[
              style.sendingWebButtonView,
              { paddingVertical: window.height * 0.005 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                onComment();
              }}
              style={{
                backgroundColor: Colors.Blueberry,
                width: window.width * 0.13,
                height: window.height * 0.08,
                borderRadius: window.height * 0.01,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: window.height * 0.01,
              }}
            >
              <Text style={style.sendText}>{Strings.SEND}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ProfileDetail
        item={{ _id: uId }}
        showProfileModal={showProfileModal}
        setProfileModal={setProfileModal}
      />
    </View>
  );
};

export default PostDetails;
