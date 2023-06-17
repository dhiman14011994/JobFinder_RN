/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  Modal
} from 'react-native';
import React, { useRef, useState } from 'react';
import CustomSearchBar from '../../Component/CustomSearchBar';
import Colors from '../../Resources/Colors';
import NotchArea from '../../Component/SafeArea';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction, searchUserAction } from '../../Redux/actions/homeAction';
import FastImage from 'react-native-fast-image';
import { UserPlaceholder, backIcon } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { RouteName } from '../../Navigation/routeName';
import { mxHeight, mxWidth } from '../../Util';
import CustomHeader from '../../Component/CustomHeader';
import Strings from '../../Resources/Strings';
import SearchUserList from './SearchComponent/SearchUserList';
import UnlockFullAccess from '../../Component/UnlockFullAccess';

const Search = ({ navigation }) => {
  const textinputRef = useRef(null);
  const dispatch = useDispatch();
  const searchedUser = useSelector((state) => state.home.searchedUser);
  const userData = useSelector((state) => state.auth.userData);
  const suggestionUsers = useSelector((state) => state.profile.suggestionList);
  const { width, height } = useWindowDimensions();
  const [showUnlockFullAccess, setShowUnlockFullAccess] = useState(false);

  const onSearchText = (keyword) => {
    if (keyword.length < 1 || keyword.length > 2) {
      dispatch(
        searchUserAction({
          keyword,
          onSuccess: (result) => {
            console.log('Results fetch fetchMyProfile', result);
          },
          onError: (error) => {
            console.log('search errorr>>>', error);
          },
        })
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <SearchUserList item={item} goToProfile={() => goToProfile(item?._id)} />
    );
  };

  const goToProfile = (id) => {
    // alert(id);
    if (id !== userData?.data._id) {
      navigation.navigate(RouteName.OTHER_PROFILE, { userId: id });
    }
  };

  const ListFooterComponent = () => {
    return <View style={{ height: mxHeight * 0.3 }} />;
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: Colors.White },
        NotchArea.AndroidSafeArea,
      ]}
    >
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: mxHeight * 0.025,
              borderRadius: mxHeight * 0.022,
            }}
            onPress={() => {
              onSearchText('');
              navigation.goBack();
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: mxHeight * 0.03, width: mxHeight * 0.03 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Search User'}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <CustomSearchBar
          refValue={textinputRef}
          isSearchScreen={true}
          onSearchText={(text) => onSearchText(text)}
        />
        <CustomText
          {...theme.fontBold}
          textColor={Colors.Blueberry}
          marginTop={height * 0.02}
          marginBottom={height * 0.05}
          marginLeft={width * 0.05}
          style={{ textDecorationLine: 'underline' }}
          onPress={() => {
            navigation.navigate(RouteName.SUGGESTION);
          }}
        >
          {Strings.SUGGESTION_NEW_CONNECT}
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchedUser}
          renderItem={renderItem}
          ListFooterComponent={ListFooterComponent}
        />
        {/* <Modal
          animationType={'fade'}
          transparent={true}
          visible={showUnlockFullAccess}
          onRequestClose={() => {
            setShowUnlockFullAccess(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',

              paddingHorizontal: 20,
              bottom: 100,
            }}
          >
            <UnlockFullAccess
              onUnlock={() => {
                setShowUnlockFullAccess(false);
                navigation.navigate(RouteName.SUBSCRIPTIONS);
              }}
              OnCancel={() => setShowUnlockFullAccess(false)}
            />
          </View>
        </Modal> */}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
