import { Image, useWindowDimensions, View } from 'react-native-web';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { CustomText } from '../CustomComponent';
import { style } from './style';
import { mxWidth } from '../../Util';
import { CardEditIcon } from '../../Resources/assets';
import CustomButton from '../CustomButton';
import {
  Amex,
  backIcon,
  CardDeleteIcon,
  Cartes_bancaires,
  Diners,
  Discover,
  JCB,
  Mastercard,
  Unionpay,
  VISA,
} from '../../Resources/assets';

const RemoveCard = ({ cardItem, onPressDismiss, onRemove }) => {
  const window = useWindowDimensions();
  const width = window.width * 0.2;

  const renderBrandImage = (brandType) => {
    switch (brandType) {
      case 'visa':
        return VISA;
      case 'amex':
        return Amex;
      case 'cartes_bancaires':
        return Cartes_bancaires;
      case 'diners':
        return Diners;
      case 'discover':
        return Discover;
      case 'jcb':
        return JCB;
      case 'mastercard':
        return Mastercard;
      case 'unionpay':
        return Unionpay;
    }
  };

  return (
    <View
      style={[style.background, { width: window.width, height: window.height }]}
    >
      <View style={[style.containerView, { width: width }]}>
        <View style={{ alignItems: 'center' }}>
          <CustomText
            {...theme.fontBold}
            style={{
              textAlign: 'center',
            }}
            fontSize={fontResize(mxWidth * 0.012)}
          >
            Remove Card
          </CustomText>
          <CustomText
            textColor={Colors.DimGray}
            {...theme.fontRegular}
            style={{ textAlign: 'center' }}
            marginTop={window.height * 0.01}
            fontSize={fontResize(mxWidth * 0.009)}
          >
            Are you sure you want to remove card?
          </CustomText>
        </View>

        <View
          style={[
            style.webButtonVw,
            {
              width: width,
              paddingVertical: window.height * 0.02,
            },
          ]}
        >
          <View
            style={{
              width: width / 2,
              paddingHorizontal: window.width * 0.002,
            }}
          >
            <CustomText
              {...theme.fontRegular}
              fontSize={fontResize(mxWidth * 0.011)}
            >
              {`*** *** *** *** ${cardItem?.cardLastFourDigit}`}
            </CustomText>
          </View>
          <Image
            style={{
              height: window.height * 0.04,
              width: window.width * 0.04,
            }}
            source={renderBrandImage(cardItem?.cardBrand.toLowerCase())}
            resizeMode="contain"
          />
        </View>

        <View>
          <CustomButton
            onPress={onRemove}
            width={width * 0.9}
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
            width={width * 0.9}
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
    </View>
  );
};

export default RemoveCard;
