import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon } from '../../Resources/assets';
import SuggestionUserList from './SuggestionComponent/SuggestionUserList';
import Colors from '../../Resources/Colors';
import { RouteName } from '../../Navigation/routeName';
import {
  SetSuggestionUserAction,
  cancelSuggestionUserAction,
  followUserAction,
  getSuggestionUserAction,
} from '../../Redux/actions/profileAction';
import Emitter from '../../Util/eventEmitter';
import { BackButton } from '../Authentication/VerificationStyle';
import Strings from '../../Resources/Strings';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Type from '../../Constants/Type/type';
console.disableYellowBox = true;

const Suggestion = ({
  backPress,
  fetchOtherUserProfile,
  setItem,
  setProfileModal,
}) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const suggestionUsers = useSelector((state) => state.profile.suggestionList);
  const [followUserList, setFollowUserList] = useState([]);

  // get suggestion user list
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

  // Check follow user detail index
  const getFollowIndex = useCallback(
    (id) => {
      var getIndex = followUserList.findIndex((element) => element == id);
      return getIndex == -1
        ? -1
        : suggestionUsers.findIndex((element) => element._id == id);
    },
    [followUserList]
  );

  // render suggest list data

  const suggestRenderItem = ({ item, index }) => {
    if (index < 10) {
      return (
        <SuggestionUserList
          item={item}
          goToProfile={() => goToProfile(item)}
          height={height}
          width={width}
          index={index}
          cancelSuggestion={() => cancelUser({ id: item?._id, index: index })}
          followUser={() => followUser({ id: item?._id, index: index })}
          isFollow={getFollowIndex(item?._id)}
        />
      );
    }
  };

  // call cancel user suggestion

  const cancelUser = ({ id, index }) => {
    cancelSuggestionUser({ id: id, index: index });
  };

  // move to view all details user
  const goToProfile = (data) => {
    if (data._id !== userData?.data._id) {
      fetchOtherUserProfile(data);
      setItem(data);
      setProfileModal(true);
    }
  };

  // cancel suggestion user suggestion list
  const cancelSuggestionUser = ({ id, index }) => {
    const param = {
      suggestion_id: id,
    };

    dispatch(
      cancelSuggestionUserAction({
        param,
        onSuccess: (result) => {
          var userList = suggestionUsers;
          userList.splice(index, 1);
          dispatch(SetSuggestionUserAction({ data: userList }));
          if (suggestionUsers.length < 11) {
            fetchSuggestionUser();
          }
        },
        onError: (error) => {
          console.log('err>>>>', error);
        },
      })
    );
  };

  // follow the new suggestion user
  const followUser = ({ id, index }) => {
    const params = {
      follower_id: id,
    };
    setFollowUserList([...followUserList, id]);
    dispatch(
      followUserAction({
        params,
        onSuccess: (result) => {
          setTimeout(() => {
            Emitter.emit(Type.EMITTER.STORE_CREATE);
            var userList = suggestionUsers;
            userList.splice(index, 1);
            dispatch(SetSuggestionUserAction({ data: userList }));
            if (suggestionUsers.length < 11) {
              fetchSuggestionUser();
            }
          }, 2000);
        },
        onError: (error) => {
          console.log('err>>>>', error);
        },
      })
    );
  };

  return (
    <View style={[styles.conatiner]}>
      <View style={[styles.hearderView, { marginVertical: height * 0.03 }]}>
        <TouchableOpacity
          onPress={() => backPress()}
          style={[styles.backButton, { left: width * 0.02 }]}
        >
          <BackButton resizeMode="contain" source={backIcon} />
        </TouchableOpacity>
        <Text
          style={[styles.titleText, { fontSize: fontResize(height * 0.03) }]}
        >
          {Strings.SUGGESTIONS}
        </Text>
      </View>

      <FlatList
        data={[...suggestionUsers]}
        numColumns={2}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={suggestRenderItem}
      />
    </View>
  );
};

export default Suggestion;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.White,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    ...theme.fontBold,
    color: Colors.Black,
  },
  hearderView: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
  },
});
