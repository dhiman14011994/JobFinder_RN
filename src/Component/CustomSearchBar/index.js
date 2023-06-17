import {StyleSheet, Image, View, TextInput} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import {searchGrayIcon, filterIcon} from '../../Resources/assets';
import {theme} from '../../Util/constant';

const CustomSearchBar = ({refValue, isSearchScreen = false, onSearchText}) => {
  return (
    <View
      style={{
        backgroundColor: '#F7F7F8',
        paddingHorizontal: 12,
        flexDirection: 'row',

        borderRadius: 8,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <TextInput
          ref={re => {
            refValue = re;
          }}
          style={{
            paddingVertical: 16,
            ...theme.fontSemiBold,
            fontSize: 16,
            paddingHorizontal: 10,
            flex: 1,
            color: Colors.Black,
          }}
          placeholder="Search"
          placeholderTextColor={Colors.DimGray}
          onChangeText={text => {
            onSearchText(text);
          }}
        />
        <Image
          resizeMode="contain"
          style={{height: 20, width: 20}}
          source={searchGrayIcon}
        />
      </View>
      {!isSearchScreen ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            marginVertical: 6,
            marginHorizontal: 5,
            borderLeftColor: Colors.PrimaryGray1,
          }}>
          <Image
            resizeMode="contain"
            style={{height: 26, width: 26, marginLeft: 16}}
            source={filterIcon}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({});
