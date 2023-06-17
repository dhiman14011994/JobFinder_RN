import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import CustomSearchViewWeb from '../CustomSearchInputWeb';
import { downArrow } from '../../Resources/assets';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';

const CustomDropDown = ({
  value,
  window,
  searchedUser,
  setItem,
  data,
  containerStyle = {},
  isOpen,
  setOpen,
}) => {
  const { width, height } = Dimensions.get('window');
  const renderSearchResult = ({ item, index }) => {
    if (item == '' || null) {
      return <></>;
    } else {
      return (
        <View
          style={{
            paddingTop: height * 0.005,
            borderTopWidth: 1,

            borderTopColor: Colors.gray2,
            paddingVertical: height * 0.008,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setItem(item.value);
              setOpen(!isOpen);
            }}
            style={{
              marginVertical: width * 0.001,
              zIndex: width * 0.001,
              padding: width * 0.001,
              paddingHorizontal: width * 0.008,
            }}
          >
            <Text style={{ fontSize: fontResize(height * 0.012) }}>
              {item.value}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View
      style={[
        {
          zIndex: width * 0.001,
        },
        containerStyle,
        !isOpen ? { height: height * 0.057 } : {},
      ]}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: 'white',
            marginTop: 0,
            width: '100%',
            paddingHorizontal: '3%',
            borderRadius: width * 0.005,
            borderWidth: 1,
            borderColor: Colors.gray2,
            paddingVertical: width * 0.001,
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: height * 0.05,
            padding: width * 0.008,
            // paddingVertical: height * 0.008,
          }}
          onPress={() => setOpen(!isOpen)}
        >
          <Text style={{ fontSize: fontResize(height * 0.012) }}>{value}</Text>
          <Image
            style={{
              width: height * 0.01,
              height: height * 0.01,
              marginRight: height * 0.001,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            source={downArrow}
          />
        </TouchableOpacity>

        <FlatList
          data={isOpen ? data : []}
          renderItem={renderSearchResult}
          keyExtractor={(item) => '' + item.id}
        />
      </View>
    </View>
  );
};

export default CustomDropDown;
