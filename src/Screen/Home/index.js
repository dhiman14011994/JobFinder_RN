/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  RefreshControl,
  AppState,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../Component/CustomHeader';
import StoriesCircle from '../../Component/StoriesCircle';
import { mxHeight, mxWidth } from '../../Util';
import FeedPost from '../../Component/FeedPost';
import AdBannerStatic from '../../Component/AdBannerStatic';
import {
  faqActive,
  headerLogo,
  headerSearch,
  notificationIcon,
} from '../../Resources/assets';
import Feed from '../../Component/Feed';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import Emitter from '../../Util/eventEmitter';
import UnlockFullAccess from '../../Component/UnlockFullAccess';
import {
  createPost,
  fetchAllPosts,
  likePost,
  uploadImage,
  hideAllPost,
  commentPost,
  sharePost,
  setCreatePostLoading,
  setSubscriptionModalAction,
} from '../../Redux/actions/homeAction';
import ViewComments from '../ViewComments';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setLoading } from '../../Redux/actions/authAction';
import Toast from 'react-native-simple-toast';
import {
  fetchMyProfile,
  fetchOrganizationMyProfile,
  fetchRecruiterMyProfile,
  fetchSubscriptions,
  getAllUserList,
  getSuggestionUserAction,
} from '../../Redux/actions/profileAction';
import Strings from '../../Resources/Strings';
import { updateUserStatus } from '../../Constants/FireStoremanager/FireStoremanager';
import { fetchEvents, fetchJobs } from '../../Redux/actions/jobAndEventAction';
import ReportSuccessComponent from '../../Component/ReportSuccess';
import Type from '../../Constants/Type/type';
import ReactNativeBlobUtil from 'react-native-blob-util';
import CustomMediaSelectorModal from '../../Component/CustomMediaSelectorModal/CustomMediaSelectorModal';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoldAxessFullAccess from '../../Component/GoldAxessFullAccess';

const Home = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.home.stories);
  const posts = useSelector((state) => state.home.posts);
  const [showStroies, setShowStroies] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [comments, setComments] = useState({});
  const [storyUser, setStoryUser] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [postDescription, setPostDescription] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isNotification = useSelector((state) => state.auth.isNotification);
  const userData = useSelector((state) => state.auth.userData);
  const postLoading = useSelector((state) => state.home.postLoading);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const subscriptionList = useSelector(
    (state) => state.profile.subscriptionList
  );
  const isShowBanner = useSelector((state) => state.home.isSubscriptionModal);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const window = useWindowDimensions();

  const [jobs, setJobs] = useState({});
  const [event, setEvent] = useState({});
  const [isReportSuccess, setReportSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [mediaType, setMediaType] = useState('image');
  const [notification, setNotification] = useState(false);

  const [showBanner, setShowBanner] = useState(false);

  useEffect(async () => {
    const bannerShow = await AsyncStorage.getItem(Strings.SHOW_BIG_BANNER);

    

    if ((bannerShow === null || bannerShow === 'true') && type == Strings.PROFESSIONAL && subscriptionList[1]?.is_subscribed == null ) {
      console.log("is_subscribed == null>>>", subscriptionList,(bannerShow === null || bannerShow === 'true') && type == Strings.PROFESSIONAL && subscriptionList[1]?.is_subscribed == null, 'new>>', bannerShow === null, bannerShow === 'true' , type == Strings.PROFESSIONAL , subscriptionList[1]?.is_subscribed == null)
      dispatch(setSubscriptionModalAction(true));
      setShowBanner(true);
    } else {
      dispatch(setSubscriptionModalAction(false));
      setShowBanner(false);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      navigation.navigate(RouteName.NOTIFICATION);
    }
  }, [notification]);

  useEffect(async () => {
    AppState.addEventListener('change', handleChange);
    fetchDB('isNotification').then((res) => {
      setNotification(res == 'true');
    });
    fetchProProfile();
    fetchAllData();
    fetchAllJobs();
    fetchAllUser();
    fetchSuggestionUser();
    fetchSubscription();
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 5000);
    Emitter.on(Type.EMITTER.STORE_CREATE, () => {
      fetchAllData();
      fetchAllUser();
    });

    Emitter.on(Type.EMITTER.REPORT_POST, (data) => {
      setUserName(data?.data);
      setReportSuccess(true);
      fetchAllData();
    });

    Emitter.on(Type.EMITTER.HIDE_POST, () => {
      fetchAllData();
    });

    Emitter.on(Type.EMITTER.UNFOLLOW_USER, () => {
      fetchAllData();
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      navigation.navigate(RouteName.NOTIFICATION);
    });

    Emitter.on('Subscribed', () => {
      fetchSubscription();
    });

    return () => {
      AppState.removeEventListener('change', handleChange);
      Emitter.off(Type.EMITTER.STORE_CREATE);
      Emitter.off(Type.EMITTER.REPORT_POST);
      Emitter.off(Type.EMITTER.HIDE_POST);
      Emitter.off(Type.EMITTER.UNFOLLOW_USER);
      Emitter.off('Subscribed');
    };
  }, []);

  const fetchSubscription = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchSubscriptions({
          onSuccess: (result) => {
            dispatch(setLoading(false));

          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };



  const fetchDB = (key) => {
    return AsyncStorage.getItem(key).catch((error) =>
      console.log('error>>>', error)
    );
  };

  // get new connection user suggestion list
  const fetchSuggestionUser = () => {
    dispatch(
      getSuggestionUserAction({
        onSuccess: (result) => {},
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  // get all user list user
  const fetchAllUser = () => {
    dispatch(
      getAllUserList({
        onSuccess: (result) => {
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };
  // get job list
  const fetchAllJobs = () => {
    dispatch(
      fetchJobs({
        onSuccess: (result) => {
          setJobs(result);

          dispatch(setLoading(false));
          fetchAllEvents();
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  // get all event list
  const fetchAllEvents = () => {
    dispatch(
      fetchEvents({
        onSuccess: (result) => {
          setEvent(result);

          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  // update user status firebase
  const handleChange = async (newState) => {
    if (newState === 'background' || newState === 'inactive') {
      let updateStatus = await updateUserStatus({
        id: userData.data._id,
        status: 'offline',
      });
    } else {
      let updateStatus = await updateUserStatus({
        id: userData.data._id,
        status: 'online',
      });
    }
  };

  // get user account information
  const fetchProProfile = () => {
    dispatch(setLoading(true));

    try {
      if (type == Strings.PROFESSIONAL) {
        dispatch(
          fetchMyProfile({
            token,
            onSuccess: (result) => {
              dispatch(setLoading(false));
            },
            onError: (error) => {
              Toast.show('Something went wrong.');
              dispatch(setLoading(false));
            },
          })
        );
      } else if (type === Strings.RECRUITER) {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
        dispatch(
          fetchRecruiterMyProfile({
            token,
            onSuccess: (result) => {
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));

              Toast.show('Something went wrong.');
            },
          })
        );
      } else if (type === Strings.ORGANIZATION) {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
        dispatch(
          fetchOrganizationMyProfile({
            token,
            onSuccess: (result) => {
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  // top to refesh home screen
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllData();
  }, [refreshing]);

  // get all user post data
  const fetchAllData = () => {
    try {
      var allPost = false;
      var allStories = false;
      dispatch(setLoading(true));

      dispatch(
        fetchAllPosts({
          onSuccess: (result) => {
            allPost = true;
            setRefreshing(false);
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            setRefreshing(false);
          },
        })
      );
      if (allPost && allStories) {
        setRefreshing(false);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      dispatch(setLoading(false));
    }
  };
  // select image create post user
  const selectImage = async (type) => {
    try {
      let options = {
        maxWidth: 1000,
        maxHeight: 1000,
        mediaType: mediaType == 'image' ? 'photo' : 'video',
        storageOptions: {
          skipBackup: true,
          path: mediaType == 'image' ? 'images' : 'videos',
        },
        selectionLimit: mediaType == 'image' ? 10 : 1,
        quality: 0.1,
      };
      if (type === 'camera') {
        launchCamera(options, (res) => {
          if (res?.assets && res?.assets[0]) {
            uploadPostImage(res);
          }
        });
      } else {
        launchImageLibrary(options, (response) => {
          if (response?.assets && response?.assets[0]) {
            uploadPostImage(response);
          }
        });
      }
    } catch (err) {}
  };

  // check image size create post get image
  const uploadPostImage = (response) => {
    const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      setPostImage(response?.assets[0].uri);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };

  // Add vaildation create user post
  const validation = () => {
    if (postDescription !== '') {
      dispatch(setLoading(true));

      if (postImage) {
        uploadImageData();
      } else {
        createPostService(null);
      }
      setRefreshing(false);
      dispatch(setLoading(false));
    } else {
      Toast.show('Description is empty');
      setRefreshing(false);
      dispatch(setLoading(false));
    }
  };
  // upload image data create post
  const uploadImageData = () => {
    let data = { imagePath: postImage };

    dispatch(
      uploadImage({
        data,
        onSuccess: (result) => {
          if (result.data) {
            createPostService(result.data);
          }
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  // Upload  create post data
  const createPostService = (imagePath) => {
    dispatch(setCreatePostLoading(true));
    let params = {};
    if (imagePath) {
      params = {
        image: imagePath,
        description: postDescription,
      };
    } else {
      params = {
        description: postDescription,
      };
    }

    dispatch(
      createPost({
        params,
        onSuccess: (result) => {
          setPostImage(null);
          setPostDescription('');
          fetchAllData();
          dispatch(setLoading(false));
        },
        onError: (error) => {
          console.log('error>>>', error);
          dispatch(setLoading(false));
        },
      })
    );
  };

  const getUserProfile = (id) => {
    if (id !== userData.data._id) {
      navigation.navigate(RouteName.OTHER_PROFILE, { userId: id });
      setShowStroies(false);
      setViewComments(false);
      dispatch(setLoading(false));
    }
  };

  // const renderItem = ({ item, index }) => {
  //   return (
  //     <StoriesCircle
  //       onPressOnCreateStory={() => navigation.navigate(RouteName.CREATE_STORY)}
  //       onPressViewStory={(user) => {
  //         setStoryUser(user);
  //         setShowStroies(true);
  //       }}
  //       isMyStory={index === 0}
  //       item={item}
  //       key={`${index}`}
  //     />
  //   );
  // };

  const renderItemFeed = ({ item, index }) => {
    if (index === 0) {
      // Render Stories
      // return renderStories();
    } else if (index === 1) {
      // Render Post Feed
      return renderCreatePostFeed();
    } else if (index === 2) {
      // Render Banner Add
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 0.2,
            marginHorizontal: '5%',
            backgroundColor: Colors.DimGray,
          }}
        >
          {/* <AdBannerStatic /> */}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 22,
            paddingHorizontal: 12,
          }}
        >
          <Feed
            index={index}
            userId={userData?.data?._id || '456123'}
            item={item}
            onUserProfile={(id) => getUserProfile(id)}
            onLike={(id) => onLike(id)}
            onComment={(comment, postId) => onComment(comment, postId)}
            onHide={(type, userId, postId) => hidePost(type, userId, postId)}
            onShare={(id) => onShare(id)}
            jobs={jobs}
            event={event}
            navigation={navigation}
            setUpdate={() => {
              fetchAllData();
            }}
            userInfo={userInfo}
            window={window}
          />
        </View>
      );
    }
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
          fetchAllData();
          setRefreshing(false);
          dispatch(setLoading(false));
        },
        onError: (error) => {
          setRefreshing(false);
          dispatch(setLoading(false));
        },
      })
    );
  };

  const onLike = (post_id) => {
    dispatch(
      likePost({
        post_id,
        onSuccess: (result) => {
          fetchAllData();
          setRefreshing(false);
          dispatch(setLoading(false));
        },
        onError: (error) => {
          setRefreshing(false);
          dispatch(setLoading(false));
        },
      })
    );
  };

  const onShare = (post_id) => {
    dispatch(
      sharePost({
        post_id,
        onSuccess: (result) => {
          fetchAllData();
        },
        onError: (error) => {},
      })
    );
  };
  const onComment = (comment, postId) => {
    setComments({ comment: comment, postId: postId });
    setViewComments(true);
  };
  const onSubmitComment = (id, comment, tagUser) => {
    let params = {
      post_id: id,
      comment: comment,
      tagged_users: tagUser,
    };
    dispatch(
      commentPost({
        params,
        onSuccess: (result) => {
          fetchAllData();
          Emitter.emit(Type.EMITTER.COMMENTDONE, result.data);
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderCreatePostFeed = () => {
    return (
      <>
        <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
          <FeedPost
            onPressCamera={() => {
              setVisible(true);
              setMediaType('video');
              // selectImage('camera');
            }}
            onPressGallery={() => {
              setMediaType('image');
              setVisible(true);
              // selectImage('gallery');
            }}
            onCreatePost={validation}
            commentTextInputValue={postDescription}
            onTextChange={(text) => setPostDescription(text)}
            selectedImage={postImage}
            postLoading={postLoading}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
        <CustomHeader
          screenName={'Home'}
          leftButtons={
            <TouchableOpacity
              onPress={() => {
                console.log(navigation.navigate(RouteName.OUR_MISSION));
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 44, width: 44 }}
                source={headerLogo}
              />
            </TouchableOpacity>
          }
          rightButtons={
            <>
              <TouchableOpacity
                style={{
                  padding: 6,
                  alignItems: 'flex-end',
                }}
                onPress={() => navigation.navigate(RouteName.SEARCH)}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 30, width: 30 }}
                  source={headerSearch}
                />
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 10,
                    color: Colors.Blueberry,
                  }}
                >
                  {'Seach Connections'}
                </Text>
              </TouchableOpacity>
              {/* <View style={{ width: 12 }} /> */}
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteName.NOTIFICATION)}
                style={{ padding: 6, alignItems: 'flex-end' }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 30, width: 30 }}
                  source={notificationIcon}
                />
                {isNotification && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: 'red',
                      borderRadius: 5,
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                  />
                )}
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Bold',
                      fontSize: 10,
                      color: Colors.OrangeColor,
                    }}
                  >
                    {'EQ '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 10,
                      color: Colors.Blueberry,
                    }}
                  >
                    {'Notifications'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          }
          title={'News Feed'}
        />

        {isReportSuccess && (
          <ReportSuccessComponent
            userName={userName}
            setShow={(value) => {
              setReportSuccess(value);
            }}
          />
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts && posts}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={Colors.Blueberry}
              onRefresh={onRefresh}
            />
          }
          renderItem={renderItemFeed}
        />
        {isVisible && (
          <CustomMediaSelectorModal
            modalVisible={isVisible}
            mediaType={mediaType}
            onRequestClose={() => {
              setVisible(false);
            }}
            selectImage={(data) => {
              setVisible(false);
              selectImage(data);
            }}
          />
        )}


      </SafeAreaView>
      <Modal
        avoidKeyboard={false}
        animationType={'slide'}
        transparent={true}
        visible={viewComments}
        onRequestClose={() => {}}
      >
        {/*All views of Modal*/}
        <TouchableOpacity
          onPress={() => setViewComments(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          activeOpacity={1}
        />
        <View
          style={{
            height: mxHeight * 0.8,
            width: '100%',
            bottom: 0,
            position: 'absolute',
          }}
        >
          <ViewComments
            comments={comments.comment}
            postId={comments.postId}
            onSubmitComment={(id, comment, tagUser) =>
              onSubmitComment(id, comment, tagUser)
            }
            onClose={() => setViewComments(false)}
            onUserProfile={(id) => {
              getUserProfile(id);
            }}
          />
        </View>
      </Modal>
       {isShowBanner && <Modal
          animated={true}
          animationType={'slide'}
          transparent={true}
          visible={isShowBanner}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <GoldAxessFullAccess
              isCancel
              OnCancel={() => {
                AsyncStorage.setItem(Strings.SHOW_BIG_BANNER, 'false');
                dispatch(setSubscriptionModalAction(false));
                setShowBanner(false);
              }}
              onUnlock={() => {
                AsyncStorage.setItem(Strings.SHOW_BIG_BANNER, 'false');
                dispatch(setSubscriptionModalAction(false));
                setShowBanner(false);
                navigation.navigate(RouteName.SUBSCRIPTIONS);
              }}
            />
          </View>
        </Modal>}
      
      
    </>
  );
};

export default Home;
