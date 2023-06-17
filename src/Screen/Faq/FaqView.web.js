/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import { CustomText } from '../../Component/CustomComponent';
import { style } from './style';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { useWindowDimensions } from 'react-native-web';
import { fontResize } from '../../Util/font';

const FaqView = ({ question, answer, isView, viewAnswer, index }) => {
  const window = useWindowDimensions();
  const width = window.width;
  const height = window.height;
  return (
    <View
      style={{
        width: width * 0.5,
        paddingVertical: height * 0.01,
        marginTop: height * 0.02,
        borderColor: Colors.PrimaryGray4,
        borderTopWidth: index === 0 ? 0 : 1,
      }}
    >
      <View style={style.questionVw}>
        <CustomText
          style={{ width: width * 0.5, marginRight: width * 0.03 }}
          fontFamily={'Gilroy-Medium'}
          fontSize={fontResize(width * 0.011)}
        >
          {question}
        </CustomText>
        <CustomText
          style={{ paddingHorizontal: width * 0.01 }}
          onPress={() => viewAnswer()}
          fontSize={fontResize(width * 0.016)}
        >
          {isView ? '-' : '+'}
        </CustomText>
      </View>
      {isView === true && (
        <CustomText
          style={{
            ...theme.fontRegular,
            lineHeight: height * 0.03,
            marginRight: width * 0.03,
          }}
          textColor={Colors.DimGray}
          marginTop={height * 0.01}
          fontSize={fontResize(width * 0.009)}
        >
          {answer}
        </CustomText>
      )}
    </View>
  );
};

export default FaqView;
