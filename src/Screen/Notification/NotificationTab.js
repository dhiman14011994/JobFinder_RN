/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Strings from '../../Resources/Strings';
import {style} from './style';
import Colors from '../../Resources/Colors';
import {fontResize} from '../../Util/font';

const NotificationTab = ({isSelected, onPress}) => {
  return (
    <View style={style.noficationTabContainer}>
      <TouchableOpacity
        onPress={() => onPress(true)}
        style={[
          style.noficationTabSunContainer,
          {borderRightWidth: 1, borderColor: Colors.PrimaryGray4},
        ]}>
        <Text
          style={{
            color: isSelected == true ? '#F6690F' : 'gray',
            fontSize: fontResize(14),
          }}>
          {Strings.NOTIFICATIONS}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(false)}
        style={style.noficationTabSunContainer}>
        <Text
          style={{
            color: isSelected == true ? 'gray' : '#F6690F',
            fontSize: fontResize(14),
          }}>
          {Strings.WHO_VIEWED}
        </Text>
      </TouchableOpacity>
      <View
        style={[
          style.lineView,
          isSelected == true ? {left: '5%'} : {right: '5%'},
        ]}
      />
    </View>
  );
};

export default NotificationTab;
