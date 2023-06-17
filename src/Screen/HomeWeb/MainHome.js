import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native-web';
import React, { useState, useEffect } from 'react';
import FeedPost from '../../Component/FeedPost';
import AdBannerStatic from '../../Component/AdBannerStatic';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../../Component/Feed';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import Emitter from '../../Util/eventEmitter';
import {
  createPost,
  fetchAllPosts,
  likePost,
  uploadImage,
  hideAllPost,
  commentPost,
  searchUserAction,
} from '../../Redux/actions/homeAction';
import { decode as atob, encode as btoa } from 'base-64';
import ProfileDetail from '../../Component/ProfileDetail/index.web';
import {
  fetchOtherProfile,
  getAllUserList,
  getSuggestionUserAction,
} from '../../Redux/actions/profileAction';
import SearchWebView from '../../Component/SearchWebView';
import { style } from '../Home/style';
import { setLoading } from '../../Redux/actions/authAction';
import toast from 'react-simple-toasts';
import { imageUplaod } from '../../Redux/services/profileService';
import Strings from '../../Resources/Strings';
import CameraModal from './Camera/Modal/index.web';
import JobWeb from '../JobWeb/index.web';
import Events from '../Events';
import { useNavigation } from '@react-navigation/native';
import ApplyJobView from '../JobEventWeb/ApplyJobView';
import { RouteName } from '../../Navigation/routeName';
import Type from '../../Constants/Type/type';
import { Dimensions } from 'react-native';
import ReportSuccessComponent from '../../Component/ReportSuccess';
import ReportSuccessWebComponent from '../../Component/ReportSuccess/index.web';
import Suggestion from '../Suggestion';

const MainHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.home.posts);
  const [viewComments, setViewComments] = useState(false);
  const [comments, setComments] = useState({});
  const [username, setUsername] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [item, setItem] = useState([]);
  const window = useWindowDimensions();
  const [showProfileModal, setProfileModal] = useState(false);
  const searchedUser = useSelector((state) => state.home.searchedUser);
  const userData = useSelector((state) => state.auth.userData);
  const [open, setOpen] = useState(false);
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const events = useSelector((state) => state.jobAndEvent.events);
  const [isapplyJob, setApplyJob] = useState(false);
  const [applyJobData, setApplyJobData] = useState('');
  const [isReportSuccess, setReportSuccess] = useState(false);
  const [isSuggestionView, setSuggestionView] = useState(false);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  useEffect(() => {
    fetchAllData();
    fetchAllUser();
    fetchSuggestionUser();
    Emitter.on(Type.EMITTER.STORE_CREATE, () => {
      fetchAllData();
      fetchAllUser();
    });
    return () => {
      Emitter.off(Type.EMITTER.STORE_CREATE);
    };
  }, []);

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

  const fetchAllUser = () => {
    try {
      dispatch(setLoading(true));
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
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  // seacrh user api call
  const onSearchText = (keyword) => {
    if (keyword.length < 1 || keyword.length > 2) {
      dispatch(
        searchUserAction({
          keyword,
          onSuccess: (result) => {},
          onError: (error) => {
            console.log('search error', error);
          },
        })
      );
    }
  };

  const fetchAllData = () => {
    dispatch(
      fetchAllPosts({
        onSuccess: (result) => {},
        onError: (error) => {
          console.log('error', error);
        },
      })
    );
  };

  const viewApplyJob = ({ id, data }) => {
    setApplyJob(true);
    setApplyJobData(data);
  };

  const renderItemFeed = ({ item, index }) => {
    if (index === 0) {
      // Create Post feed
      return renderCreatePostFeed();
    } else if (index === 1) {
    } else if (index === 2) {
      // Render Banner Add
      return <View style={style.webBenerVw}>{/* <AdBannerStatic /> */}</View>;
    } else {
      return (
        <View>
          {index === 4 && (
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 30,
                paddingHorizontal: 12,
                backgroundColor: Colors.White,
                marginTop: index === 3 ? 22 : 0,
                marginBottom: index === 8 ? 22 : 0,
                borderTopLeftRadius: index === 3 ? 22 : 0,
                borderTopRightRadius: index === 3 ? 22 : 0,
                borderBottomLeftRadius: index === 8 ? 22 : 0,
                borderBottomRightRadius: index === 8 ? 22 : 0,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: Dimensions.get('screen').height * 0.02,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.Black,
                    ...theme.fontBold,
                    alignItems: 'flex-start',
                  }}
                >
                  Featured Jobs
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    Emitter.emit(Type.EMITTER.JOBWEB);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.PrimaryGray,
                      ...theme.fontMedium,
                      alignItems: 'flex-end',
                      textDecorationLine: 'underline',
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <JobWeb
                  jobs={jobs}
                  type={type}
                  onjobPress={(data) => {
                    viewApplyJob(data);
                  }}
                />
              </ScrollView>

              {events.length > 0 && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: Dimensions.get('screen').height * 0.02,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.Black,
                        ...theme.fontBold,
                        alignItems: 'flex-start',
                      }}
                    >
                      Featured Events
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Emitter.emit(Type.EMITTER.JOBWEB);
                        setTimeout(() => {
                          Emitter.emit(Type.EMITTER.SEE_EVENT);
                        }, 200);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.PrimaryGray,
                          ...theme.fontMedium,
                          alignItems: 'flex-end',
                          textDecorationLine: 'underline',
                        }}
                      >
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                  >
                    <Events
                      selectionType={Type.EVENT_TYPE.SEE_ALL}
                      navigation={navigation}
                      events={events}
                      type={type}
                    />
                  </ScrollView>
                </View>
              )}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 30,
              paddingHorizontal: 12,
              backgroundColor: Colors.White,
              marginTop: index === 3 ? 22 : 0,
              marginBottom: index === 8 ? 22 : 0,
              borderTopLeftRadius: index === 3 ? 22 : 0,
              borderTopRightRadius: index === 3 ? 22 : 0,
              borderBottomLeftRadius: index === 8 ? 22 : 0,
              borderBottomRightRadius: index === 8 ? 22 : 0,
            }}
          >
            <Feed
              userId={userData?.data?._id || '123456'}
              item={item}
              onLike={(id) => onLike(id)}
              onComment={(comment, postId) => onComment(comment, postId)}
              onHide={(type, userId, postId) => hidePost(type, userId, postId)}
              onSubmitComment={({ postId, textDescription, tagUser }) =>
                onSubmitComment({ postId, textDescription, tagUser })
              }
              setUpdate={({ type, name }) => {
                setUsername(name);
                if (!type) {
                  setReportSuccess(true);
                }
                fetchAllData();
              }}
              navigation={navigation}
              onUserProfile={(id) => {
                setItem({ _id: id });
                fetchOtherUserProfile({ _id: id });
                setProfileModal(true);
              }}
              window={window}
            />
          </View>
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
        },
        onError: (error) => {
          console.log('error', error);
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
        },
        onError: (error) => {
          console.log('error', error);
        },
      })
    );
  };
  const onComment = (comment, postId) => {
    setComments({ comment: comment, postId: postId });
    setViewComments(true);
  };
  const validation = () => {
    createPostService(postImage);
  };

  const createPostService = (imagePath) => {
    try {
      if (postDescription === '') {
        toast(Strings.INVALID_POST_MESSAGE);
      } else {
        dispatch(setLoading(true));
        var params = {};
        if (imagePath != '') {
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
              dispatch(setLoading(false));
              fetchAllData();
              setPostImage(null);
              setPostDescription('');
            },
            onError: (error) => {
              dispatch(setLoading(false));
              console.log('error7>>', error);
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
      toast(err?.message);
    }

    dispatch(
      createPost({
        params,
        onSuccess: (result) => {
          fetchAllData();
          setPostImage(null);
          setPostDescription('');
        },
        onError: (error) => {
          console.log('error', error);
        },
      })
    );
  };

  const onSubmitComment = ({ postId, textDescription, tagUser }) => {
    let params = {
      post_id: postId,
      comment: textDescription,
      tagged_users: tagUser,
    };
    dispatch(
      commentPost({
        params,
        onSuccess: (result) => {
          fetchAllData();
        },
        onError: (error) => {
          console.log('error', error);
        },
      })
    );
  };

  const uploadImageData = async (data) => {
    var getImageURI = await imageUplaod({
      file: data,
      token: userData?.access_token,
    });

    setPostImage(getImageURI.data[0]);
  };

  const renderCreatePostFeed = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 22,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 12,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{ fontSize: 16, color: Colors.Black, ...theme.fontMedium }}
          >
            Create Post
          </Text>
        </View>
        <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
          <FeedPost
            onPressGallery={(file) => {
              if (file.length > 0) {
                uploadImageData(file[0]);
              }
            }}
            removeImage={() => {
              setPostImage(null);
            }}
            commentTextInputValue={postDescription}
            onCreatePost={validation}
            onTextChange={(text) => {
              setPostDescription(text);
            }}
            selectedImage={postImage}
            cameraPress={() => {
              setOpen(true);
            }}
          />
        </View>
      </View>
    );
  };

  const fetchOtherUserProfile = (item) => {
    const userId = item._id;
    dispatch(
      fetchOtherProfile({
        userId,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  return (
    <>
      {isSuggestionView ? (
        <>
          <Suggestion
            backPress={() => {
              setSuggestionView(false);
            }}
            fetchOtherUserProfile={fetchOtherUserProfile}
            setItem={setItem}
            setProfileModal={setProfileModal}
          />
          <ProfileDetail
            item={item}
            showProfileModal={showProfileModal}
            suggestionPress={() => {
              fetchSuggestionUser();
            }}
            setProfileModal={setProfileModal}
          />
        </>
      ) : (
        <View>
          {isapplyJob ? (
            <ApplyJobView
              type={type}
              setApplyJob={setApplyJob}
              applyJobData={applyJobData}
            />
          ) : (
            <View>
              <SearchWebView
                window={window}
                onSearchText={onSearchText}
                searchedUser={searchedUser}
                fetchOtherUserProfile={fetchOtherUserProfile}
                setItem={setItem}
                setProfileModal={setProfileModal}
                suggestionPress={() => {
                  setSuggestionView(true);
                }}
              />

              {isReportSuccess && (
                <ReportSuccessComponent
                  userName={username}
                  setShow={(value) => {
                    setReportSuccess(value);
                  }}
                />
              )}

              <FlatList
                showsVerticalScrollIndicator={false}
                data={posts && posts}
                renderItem={renderItemFeed}
                style={{ marginTop: window.height * 0.05 }}
              />
            </View>
          )}

          <ProfileDetail
            item={item}
            showProfileModal={showProfileModal}
            setProfileModal={setProfileModal}
            suggestionPress={() => {
              fetchSuggestionUser();
            }}
          />
          {open && (
            <CameraModal
              showCameraModal={open}
              setCameraModal={(value) => {
                setOpen(value);
              }}
              setCameraData={(value) => {
                setOpen(false);
                uploadImageData(value);
              }}
            />
          )}
        </View>
      )}
    </>
  );
};

export default MainHome;
