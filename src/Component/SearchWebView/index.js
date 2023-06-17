import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import CustomSearchViewWeb from '../CustomSearchInputWeb';
import { UserPlaceholder } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { CustomText, CustomView } from '../CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import EndPoint from '../../Redux/constants/EndPoint';
import Strings from '../../Resources/Strings';

const SearchWebView = ({
  onSearchText,
  window,
  searchedUser,
  fetchOtherUserProfile,
  setItem,
  setProfileModal,
  suggestionPress,
}) => {
  const renderSearchResult = ({ item, index }) => {
    if (item == '' || null) {
      return <></>;
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              fetchOtherUserProfile(item);
              setItem(item);
              onSearchText('');
              setProfileModal(true);
            }}
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              marginHorizontal: 4,
              borderRadius: 12,
              backgroundColor: Colors.White,
              shadowColor: Colors.PrimaryGray1,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2,

              elevation: 5,
              paddingVertical: 12,
              paddingHorizontal: 12,
              zIndex: 1,
              padding: 1,
            }}
          >
            <Image
              style={{ height: 44, width: 44, borderRadius: 44 / 2 }}
              defaultSource={UserPlaceholder}
              source={
                item?.image
                  ? { uri: EndPoint.baseAssestURL + item?.image }
                  : UserPlaceholder
              }
            />
            <View style={{ paddingHorizontal: 12, flex: 1 }}>
              <CustomText {...theme.fontRegular}>{item?.name || ''}</CustomText>
              <CustomText
                numberOfLines={2}
                ellipsizeMode="tail"
                {...theme.fontRegular}
                textColor={Colors.DimGray}
                fontSize={`${fontResize(12)}px`}
              >
                {item?.role || ''}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View
      style={{
        borderRadius: 22,
        marginBottom: window.height * 0.16,
        paddingVertical: 5,
        zIndex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'absolute',
          marginTop: 0,
          width: '100%',
          paddingHorizontal: '3%',
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderRadius: 10,
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <CustomSearchViewWeb
          placeholder={'Search'}
          IsFilterIcon
          IsSearchView
          onChange={(text) => {
            onSearchText(text);
          }}
        />

        <CustomText
          {...theme.fontBold}
          textColor={Colors.Blueberry}
          marginTop={window.height * 0.005}
          marginBottom={window.height * 0.01}
          style={{ textDecorationLine: 'underline' }}
          onPress={() => {
            suggestionPress();
            // navigation.navigate(RouteName.SUGGESTION);
          }}
        >
          {Strings.SUGGESTION_NEW_CONNECT}
        </CustomText>

        <FlatList
          data={searchedUser}
          renderItem={renderSearchResult}
          keyExtractor={(item) => '' + item.id}
        />
      </View>
    </View>
  );
};

export default SearchWebView;
