import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from './style';
import { isNative, mxWidth } from '../../Util';
import Transparent from '../../Resources/assets/Transparent.png';
import TransparentWeb from '../../Resources/assets/Trasparentweb.png';
import Strings from '../../Resources/Strings';
import CustomButton from '../../Component/CustomButton';
import { RouteName } from '../../Navigation/routeName';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import Config from 'react-native-config';

const OurGoal = ({ navigation }) => {
  const window = useWindowDimensions();
  const { width, height } = Dimensions.get('window');
  return (
    <View
      style={[
        styles.container,
        isNative
          ? {}
          : {
              justifyContent: 'center',
              alignItems: 'center',
            },
      ]}
    >
      <Image
        resizeMode={isNative ? 'contain' : 'contain'}
        style={isNative ? styles.transparentImg : styles.transparentWebImg}
        source={isNative ? Transparent : TransparentWeb}
      />
      <Text
        style={[
          styles.ourMissionTx,
          {
            marginTop: isNative ? mxWidth * 0.25 : 0,
            fontSize: isNative ? fontResize(30) : fontResize(height * 0.05),
          },
        ]}
      >
        {Strings.OUR_MISSION}
      </Text>
      <View
        style={[
          styles.ourDetailsVw,
          { marginTop: isNative ? mxWidth * 0.1 : window.height * 0.1 },
        ]}
      >
        <Text style={[styles.ourDetailsTx]}>{Strings.OUR_DETAILS}</Text>
        {!isNative && (
          <CustomButton
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: RouteName.AUTH }],
              });
            }}
            width={width * 0.15}
            height={height * 0.05}
            backgroundColor={Colors.White}
            marginTop={window.height * 0.04}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            fontFamily={'Gilroy-SemiBold'}
            fontSize={fontResize(width * 0.01)}
            textColor={Colors.Blueberry}
            text={Strings.CONTINUE}
          />
        )}
      </View>
      {isNative && (
        <CustomButton
          width={'80%'}
          marginHorizontal={'10%'}
          height={'50px'}
          backgroundColor={Colors.White}
          marginTop={'10%'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          fontFamily={'Gilroy-SemiBold'}
          fontSize={'18px'}
          textColor={Colors.Blueberry}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: RouteName.AUTH }],
            });
          }}
          buttonContainer={styles.buttonStyle}
          text={Strings.CONTINUE}
        />
      )}
    </View>
  );
};

export default OurGoal;
