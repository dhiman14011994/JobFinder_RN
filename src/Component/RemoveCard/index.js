import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {mxHeight} from '../../Util';
import Colors from '../../Resources/Colors';
import {CustomText} from '../CustomComponent';
import {theme} from '../../Util/constant';
import {CardEditIcon} from '../../Resources/assets';
import CustomButton from '../CustomButton';
import {style} from './style';
const RemoveCard = ({cardItem, onPressDismiss, onRemove}) => {
  return (
    <View style={style.container}>
      <BlurView
        style={
          Platform.OS == 'ios'
            ? style.blurCardViewIOS
            : style.blurCardViewAndroid
        }
        blurType="black"
        blurAmount={10}
        reducedTransparencyFallbackColor="black">
        <View style={style.subContainer}>
          <View style={{alignItems: 'center'}}>
            <CustomText
              {...theme.fontBold}
              style={{
                width: '100%',
                textAlign: 'center',
              }}
              fontSize={'20px'}>
              Remove Card
            </CustomText>
            <CustomText
              textColor={Colors.DimGray}
              {...theme.fontRegular}
              style={{width: '100%'}}
              marginTop={'16px'}
              fontSize={'14px'}>
              Are you sure you want to remove card?
            </CustomText>
          </View>
          <View style={style.buttonVw}>
            <Image style={{height: 40, width: 40}} source={CardEditIcon} />
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              <CustomText
                textColor={Colors.SilverLight}
                {...theme.fontBold}
                fontSize={'16px'}>
                Ending In
              </CustomText>
              <CustomText
                marginTop={'8px'}
                {...theme.fontRegular}
                fontSize={'15px'}>
                {`*** *** *** *** ${cardItem?.cardLastFourDigit}`}
              </CustomText>
            </View>
          </View>
          <View>
            <CustomButton
              onPress={onRemove}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Red}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'15px'}
              textColor={Colors.White}
              textTransform={'capitalize'}
              text={'Confirm'}
            />
            <CustomButton
              onPress={onPressDismiss}
              width={'100%'}
              height={'50px'}
              marginTop={'8px'}
              backgroundColor={Colors.White}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'15px'}
              textColor={Colors.DimGray}
              textTransform={'capitalize'}
              text={'Cancel'}
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default RemoveCard;

const styles = StyleSheet.create({});
