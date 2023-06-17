import React from 'react';
import { useWindowDimensions, Platform, Image, View } from 'react-native';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import EndPoint from '../../Redux/constants/EndPoint';

const SummaryComponent = ({ label, data, isImage, marginVertical, isLocal }) => {
  const window = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: marginVertical ? marginVertical : window.width * 0.02,
      }}
    >
      <CustomText
        fontFamily={'Gilroy-Bold'}
        textColor={Colors.PrimaryGray}
        style={{ width: '45%', paddingEnd: window.width * 0.05 }}
      >
        {label} :{' '}
      </CustomText>
      {isImage ? (
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          resizeMode="contain"
          source={isLocal ? {uri: data} : { uri: `${EndPoint.baseAssestURL}${data}` } }
        />
      ) : (
        <CustomText
          fontFamily={'Gilroy-Bold'}
          textColor={Colors.Black}
          style={{ width: '50%', paddingEnd: window.width * 0.05 }}
        >
          {data}
        </CustomText>
      )}
    </View>
  );
};

export default SummaryComponent;
