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
  Alert,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { isNative, mxHeight, mxWidth } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { backIcon } from '../../Resources/assets';
import style from './style';
import PostUserDetails from '../../Component/PostUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import PostDescription from '../../Component/PostDescription';
import PostLikeCommentView from '../../Component/PostLikeCommentView';
import SingleLineText from '../../Component/SingleLineView';
import LikeCommentButton from '../../Component/LikeCommentButton';
import Strings from '../../Resources/Strings';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import {
  blockuser,
  commentPost,
  deletePostAction,
  getPostDetails,
  hideAllPost,
  likePost,
  sharePost,
} from '../../Redux/actions/homeAction';
import CommentsView from '../../Component/commentsView';
import Emitter from '../../Util/eventEmitter';
import CustomTagView from '../../Component/CustomTagView';
import { RouteName } from '../../Navigation/routeName';
import Type from '../../Constants/Type/type';
import CustomConfirmationModal from '../../Component/CustomConfirmationModal';
import { unFollowUserAction } from '../../Redux/actions/profileAction';
import { setLoading } from '../../Redux/actions/authAction';
import { updateBlockFirebaseChatList } from '../../Constants/FireStoremanager/FireStoremanager';

var textLength = 0;

const PostDetails = ({ navigation, route }) => {
  const userData = useSelector((state) => state.auth.userData);
  const allUsers = useSelector((state) => state.profile.allUser);
  const postData = useSelector((state) => state.home.postDetails);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [lastValue, setLastValue] = useState('');
  const [tagValue, setTagValue] = useState([]);
  const [istag, setTag] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [tagUser, setTagUser] = useState([]);
  const [modalType, setModalType] = useState('');
  const [showUnfollow, setShowUnfollow] = useState(false);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  var inputRef = useRef(null);

  useEffect(() => {
    fetchPostData();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fetchPostData = () => {
    const { _id } = route?.params?.postData;
    dispatch(
      getPostDetails({
        _id,
        onSuccess: (result) => {
          console.log('result>>>', result);
          // setPostData(result?.data[0]);
        },
        onError: (error) => {
          console.log('err>>>', error);
          Alert.alert('Post Details', 'Post does not exist', [
            {
              text: 'Yes',
              onPress: () => navigation.goBack(),
            },
            { text: 'No', onPress: () => {} },
          ]);
        },
      })
    );
  };

  const hidePost = (type, userId, postId) => {
    let params = {
      post_id: postId,
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
        follower_id: route.params.postData?.user?._id,
      };

      dispatch(
        unFollowUserAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            Emitter.emit(Type.EMITTER.GET_PROFILE);
            navigation.goBack();
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
        block_user_id: route.params.postData?.user?._id,
        status: 'block',
      };
      dispatch(
        blockuser({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            const blockchatUser = updateBlockFirebaseChatList({
              id: userData.data._id,
              chatUserId: route.params.postData?.user?._id,
              isBlock: true,
            });
            const blockchatUserOther = updateBlockFirebaseChatList({
              id: route.params.postData?.user?._id,
              chatUserId: userData.data._id,
              isBlock: false,
            });
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            Emitter.emit(Type.EMITTER.GET_PROFILE);
            navigation.goBack();
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
    try {
      dispatch(setLoading(true));
      const { _id } = route.params.postData;
      dispatch(
        deletePostAction({
          _id,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            navigation.goBack();
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const listHeaderComponent = () => {
    if (postData?.created_at) {
      return (
        <View style={{}}>
          <PostUserDetails
            item={postData || route.params.postData}
            onUserProfile={(id) => {
              onUserProfile(id);
            }}
          />
          <PostDescription userData={userData} item={postData} />
          <PostLikeCommentView item={postData} />
          <SingleLineText backgroundColor={Colors.PrimaryGray1} height={0.5} />
          <LikeCommentButton
            item={postData}
            onComment={() => {}}
            onLike={() => {
              onLike(postData?._id);
            }}
            deletePostPopup={() => {
              deletePostPopup();
            }}
            onHide={(type, userId, postId) => {
              hidePost(type, userId, postId);
            }}
            onShare={(id) => {
              onShare(postData?._id);
            }}
            userId={userData?.data?._id || '456123'}
            setUpdate={() => {
              Emitter.emit(Type.EMITTER.UNFOLLOW_USER);
              navigation.goBack();
            }}
            onSelection={(value) => {
              switch (value) {
                case Type.REPORT.DONT_SEE_POST: {
                  navigation.navigate(RouteName.DONT_SEE_POST, {
                    item: postData || route.params.postData,
                  });
                  break;
                }
                case Type.MORE.REPORT_POST: {
                  navigation.navigate(RouteName.REPORT_POST, {
                    item: postData || route.params.postData,
                  });
                  break;
                }
                case Type.MORE.UNFOLLOW: {
                  setTimeout(() => {
                    setModalType(Type.MORE.UNFOLLOW);
                    setShowUnfollow(true);
                  }, 800);

                  break;
                }
                case Type.MORE.BLOCK: {
                  setTimeout(() => {
                    setModalType(Type.MORE.BLOCK);
                    setShowUnfollow(true);
                  }, 800);
                  break;
                }
              }
            }}
          />
          {postData?.comment &&
            postData?.comment?.map((item) => (
              <CommentsView
                item={item}
                onUserProfile={(id) => onUserProfile(id)}
              />
            ))}

          {showUnfollow && (
            <CustomConfirmationModal
              isModal={showUnfollow}
              setModal={(value) => {
                setShowUnfollow(false);
              }}
              setSelection={(value) => {
                if (value == Type.CONFIRMATION.YES) {
                  modalType == Type.MORE.UNFOLLOW
                    ? unfollowUser()
                    : blockUser();
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
                        route.params.postData?.user?.name || ''
                      }?`,
                    }
              }
            />
          )}
        </View>
      );
    } else {
      return <View />;
    }
  };

  const replaceTag = (data) => {
    return replaceMentionValues(data, ({ name }) => `@${name}`);
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
    Keyboard.dismiss();
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
      post_id: postData._id,
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
      navigation.navigate(RouteName.OTHER_PROFILE, { userId: id });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? -300 : -300}
    >
      <SafeAreaView style={style.container}>
        {isNative && (
          <HeaderContainer marginTop={0} marginBottom={10}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={style.backButtonStyle}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}

        {postData?.created_at ? (
          <>
            <View
              style={{
                backgroundColor: Colors.White,
                marginTop: isKeyboardVisible
                  ? Platform.OS == 'ios'
                    ? 100
                    : mxHeight * 0.3
                  : 0,
                height: isKeyboardVisible
                  ? Platform.OS == 'ios'
                    ? '100%'
                    : '50%'
                  : Platform.OS == 'ios'
                  ? '100%'
                  : '80%',
                marginTop: isKeyboardVisible ? mxHeight * 0.2 : 0,
              }}
            >
              {istag ? (
                <View
                  style={{
                    marginTop:
                      Platform.OS == 'ios'
                        ? isKeyboardVisible
                          ? -mxHeight * 0.2
                          : 0
                        : 0,
                  }}
                >
                  <FlatList
                    bounces={false}
                    data={tagValue}
                    renderItem={renderItem}
                    ListFooterComponent={
                      <>
                        {Platform.OS == 'ios' && (
                          <View
                            style={{
                              height: isKeyboardVisible
                                ? mxHeight * 0.8
                                : mxHeight * 0.5,
                            }}
                          />
                        )}
                      </>
                    }
                  />
                </View>
              ) : (
                <ScrollView
                  bounces={false}
                  style={{
                    marginTop:
                      Platform.OS == 'ios'
                        ? isKeyboardVisible
                          ? -mxHeight * 0.2
                          : 0
                        : 0,
                  }}
                >
                  <View style={{ height: '100%' }}>
                    {listHeaderComponent()}
                  </View>
                  {Platform.OS == 'ios' && (
                    <View
                      style={{
                        height: isKeyboardVisible
                          ? mxHeight * 0.8
                          : mxHeight * 0.5,
                      }}
                    />
                  )}
                </ScrollView>
              )}
            </View>

            <View
              style={[
                { justifyContent: 'center', backgroundColor: Colors.White },
                {
                  position: 'absolute',
                  bottom: isKeyboardVisible
                    ? Platform.OS == 'ios'
                      ? mxHeight * 0.38
                      : 10
                    : 10,
                  height: '10%',
                  width: mxWidth,
                  marginBottom: isKeyboardVisible ? '10%' : 0,
                },
              ]}
            >
              <View style={[style.textVwCntnr]}>
                <View style={style.inoutVw}>
                  <TextInput
                    ref={inputRef}
                    multiline={true}
                    style={style.msgTxtInpt}
                    onChangeText={(text) => {
                      onChangeText(text);
                    }}
                    onFocus={() => {}}
                    onKeyPress={handleKeyDown}
                    placeholder={'Type a message.....'}
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid="transparent"
                  >
                    <Text>{replaceTag(value)}</Text>
                  </TextInput>
                </View>
                <View style={style.sendingButtonView}>
                  <TouchableOpacity
                    onPress={() => {
                      onComment();
                    }}
                    style={[
                      style.sendBtn,
                      { backgroundColor: Colors.Blueberry },
                    ]}
                  >
                    <Text style={style.sendText}>{Strings.SEND}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostDetails;
