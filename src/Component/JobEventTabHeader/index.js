import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import Strings from '../../Resources/Strings';
import { style } from './style';
import { theme } from '../../Util/constant';
import { isNative, mxWidth } from '../../Util';
import { fontResize } from '../../Util/font';

const JobEventTabHeader = ({ onTabPress, activeTab, window }) => {
  return (
    <View style={style.container}>
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
          fontSize={isNative ? 16 : fontResize(mxWidth * 0.01)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.JOB_POST_WEB}
        </CustomText>
        {activeTab === Strings.JOB_POST_WEB && (
          <View style={style.tabEmptyView} />
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
          fontSize={isNative ? 16 : fontResize(mxWidth * 0.01)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.EVENTS}
        </CustomText>
        {activeTab === Strings.EVENTS && <View style={style.tabEmptyView} />}
      </TouchableOpacity>
    </View>
  );
};

export default JobEventTabHeader;
