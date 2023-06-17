/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {CustomText} from '../../Component/CustomComponent';
import {style} from './style';
import Colors from '../../Resources/Colors';
import {theme} from '../../Util/constant';

const FaqView = ({question, answer, isView, viewAnswer, index}) => {
  return (
    <View
      style={[
        style.qaContainer,
        {borderColor: Colors.PrimaryGray4, borderTopWidth: index == 0 ? 0 : 1},
      ]}>
      <View style={style.questionVw}>
        <CustomText style={{width: '70%'}} fontSize="18px">
          {question}
        </CustomText>
        <CustomText
          style={{paddingHorizontal: 12}}
          onPress={() => viewAnswer()}
          fontSize="28px">
          {isView ? '-' : '+'}
        </CustomText>
      </View>
      {isView == true && (
        <CustomText
          style={{...theme.fontRegular, lineHeight: 30}}
          textColor={Colors.DimGray}
          marginTop="18px"
          fontSize="14px">
          {answer}
        </CustomText>
      )}
    </View>
  );
};

export default FaqView;
