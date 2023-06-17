import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import Strings from '../../Resources/Strings';
import { style } from './style';

const CustomChatHeader = ({ onTabPress, activeTab, window }) => {
  return (
    <View>
      <View style={style.container}>
        <TouchableOpacity
          onPress={() => onTabPress(Strings.COMPANIES)}
          style={style.buttonContainer}
        >
          <CustomText
            textColor={
              activeTab === Strings.COMPANIES
                ? Colors.Blueberry
                : Colors.PrimaryGray
            }
          >
            {Strings.COMPANIES}
          </CustomText>
          {activeTab === Strings.COMPANIES && (
            <View style={style.tabEmptyView} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabPress(Strings.DIRECT_MESSAGE)}
          style={style.buttonContainer}
        >
          <CustomText
            textColor={
              activeTab === Strings.DIRECT_MESSAGE
                ? Colors.Blueberry
                : Colors.PrimaryGray
            }
          >
            {Strings.DIRECT_MESSAGE}
          </CustomText>
          {activeTab === Strings.DIRECT_MESSAGE && (
            <View style={style.tabEmptyView} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabPress(Strings.NOTIFICATIONS)}
          style={style.buttonContainer}
        >
          <CustomText
            textColor={
              activeTab === Strings.NOTIFICATIONS
                ? Colors.Blueberry
                : Colors.PrimaryGray
            }
          >
            {Strings.NOTIFICATIONS}
          </CustomText>
          {activeTab === Strings.NOTIFICATIONS && (
            <View style={style.tabEmptyView} />
          )}
        </TouchableOpacity>
      </View>
      <View style={style.emptyView} />
    </View>
  );
};

export default CustomChatHeader;
