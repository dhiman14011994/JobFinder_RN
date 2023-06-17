import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import Strings from '../../Resources/Strings';
import { style } from './style';
import { fontResize } from '../../Util/font';

const AllHomeHeader = ({ onTabPress, activeTab, window, type }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onTabPress(Strings.ALL)}
        style={[style.buttonContainer, { marginLeft: window.window * 0.001 }]}
      >
        <CustomText
          textColor={
            activeTab === Strings.ALL ? Colors.Blueberry : Colors.PrimaryGray
          }
          fontSize={fontResize(window.width * 0.012)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.ALL}
        </CustomText>
        {activeTab === Strings.ALL ? (
          <View style={style.tabEmptyView} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabPress(Strings.JOB_POST_WEB)}
        style={style.buttonContainer}
      >
        <CustomText
          textColor={
            activeTab === Strings.JOB_POST_WEB
              ? Colors.Blueberry
              : Colors.PrimaryGray
          }
          fontSize={fontResize(window.width * 0.012)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.JOB_POST_WEB}
        </CustomText>
        {activeTab === Strings.JOB_POST_WEB ? (
          <View style={style.tabEmptyView} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabPress(Strings.EVENTS)}
        style={style.buttonContainer}
      >
        <CustomText
          textColor={
            activeTab === Strings.EVENTS ? Colors.Blueberry : Colors.PrimaryGray
          }
          fontSize={fontResize(window.width * 0.012)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.EVENTS}
        </CustomText>
        {activeTab === Strings.EVENTS ? (
          <View style={style.tabEmptyView} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      {type === Strings.ORGANIZATION ? (
        <TouchableOpacity
          onPress={() => onTabPress(Strings.PROMOTIONS)}
          style={style.buttonContainer}
        >
          <CustomText
            textColor={
              activeTab === Strings.PROMOTIONS
                ? Colors.Blueberry
                : Colors.PrimaryGray
            }
            fontSize={fontResize(window.width * 0.012)}
            fontFamily={'Gilroy-Bold'}
          >
            {Strings.PROMOTIONS}
          </CustomText>
          {activeTab === Strings.PROMOTIONS ? (
            <View style={style.tabEmptyView} />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AllHomeHeader;
