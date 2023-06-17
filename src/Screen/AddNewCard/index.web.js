import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Platform,
} from 'react-native-web';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import { style } from './style';
import { CrossIcon } from '../../Resources/assets';
import CustomInputText from '../../Component/CustomInputText';
import { useState } from 'react';
import CustomButton from '../../Component/CustomButton';
import { theme } from '../../Util/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from '../../Redux/actions/authAction';
import {
  buySubscriptions,
  createNewCardAction,
  fetchMyProfile,
  updateCardAction,
} from '../../Redux/actions/profileAction';
import Emitter from '../../Util/eventEmitter';

const AddNewCard = ({
  navigation,
  route,
  isEdit,
  data,
  onDismiss,
  isFromSubscription,
  subscriptionData,
}) => {
  const window = useWindowDimensions();
  const [cardNameErr, setCardNameErr] = useState('');
  const [cardNumErr, setCardNumErr] = useState('');
  const [cardMonYearErr, setCardMonYearErr] = useState('');
  const [cardCvvErr, setCardCvvErr] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardMonYear, setCardMonYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const width = window.width * 0.23;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const year = route?.params?.data.exp_exp_year;

  useEffect(() => {
    getCardDetails();
  }, []);

  const getCardDetails = () => {
    setCardName(isEdit === true ? data.name : '');
    setCardNum(isEdit === true ? `**** **** **** ${data.last4}` : '');
    setCardMonYear(
      isEdit == true
        ? `${data.exp_month}/${String(data.exp_year).slice(-2)}`
        : ''
    );
    setCardCvv(isEdit == true ? `***` : '');
  };

  const onPressLogin = () => {
    try {
      if (!onValidation()) {
        return;
      }
      dispatch(setLoading(true));
      if (isEdit === true) {
        updateCard();
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        createNewCard();
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const onValidation = () => {
    var isValid = true;
    if (cardName.length === 0) {
      isValid = false;
      setCardNameErr(Strings.CARD_HOLDER_REQUIRED);
    }
    if (cardNum.length === 0) {
      isValid = false;
      setCardNumErr(Strings.CARD_NUMBER_REQUIRED);
    }
    if (cardMonYear.length === 0) {
      isValid = false;
      setCardMonYearErr(Strings.CARD_EXPIRE_DATE_REQUIRED);
    } else {
      var exp_month = cardMonYear.split('/')[0];
      var exp_year = cardMonYear.split('/')[1];
      var msDiff = new Date();
      var cYear = msDiff.getFullYear();
      var cy = cYear.toString();
      var currentYear = cy.slice(-2);
      var currentmonth = msDiff.getMonth() + 1;
      if (exp_year < currentYear) {
        setCardMonYearErr(Strings.INVALID_YEAR);
        isValid = false;
      } else if (exp_year == currentYear) {
        if (exp_month > 13 || exp_month <= currentmonth) {
          setCardMonYearErr(Strings.INVAILD_MONTH_AND_YEAR);
          isValid = false;
        }
      } else {
        if (exp_month > 13) {
          setCardMonYearErr(Strings.INVALID_MONTH);
          isValid = false;
        }
      }
    }

    if (cardCvv.length === 0) {
      isValid = false;
      setCardCvvErr(Strings.CARD_CVV_REQUIRED);
    }
    return isValid;
  };

  const updateCard = () => {
    try {
      const params = {
        name: cardName,
        exp_month: cardMonYear.split('/')[0],
        exp_year: cardMonYear.split('/')[1],
        card_id: data?.id,
      };
      dispatch(setLoading(true));
      dispatch(
        updateCardAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            Emitter.emit('Update_card');
            onDismiss('isUpdate');
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const createNewCard = () => {
    try {
      const params = {
        name: cardName,
        card_number: cardNum.split(' ').join(''),
        exp_month: cardMonYear.split('/')[0],
        exp_year: cardMonYear.split('/')[1],
        cvc: cardCvv,
      };

      dispatch(setLoading(true));
      dispatch(
        createNewCardAction({
          params,
          onSuccess: (result) => {
            if (result?.data === '') {
              dispatch(setLoading(false));
              onDismiss(result?.message);
              return;
            }
            dispatch(setLoading(false));
            if (isFromSubscription) {
              let data = {
                subscription_id: subscriptionData._id,
                card_id: result?.data?.card_id,
                device_name: Platform.OS,
              };
              dispatch(setLoading(false));
              buySubscription(data);
            } else {
              dispatch(setLoading(false));
              Emitter.emit('New_card_added');
              onDismiss('isAdded');
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const fetchProProfile = () => {
    dispatch(
      fetchMyProfile({
        token,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  const buySubscription = (data) => {
    dispatch(
      buySubscriptions({
        data,
        onSuccess: (result) => {
          fetchProProfile();
          Emitter.emit('Subscribed');
          onDismiss('isSubscribe');
        },
        onError: (error) => {},
      })
    );
  };

  const maxLength = (type) => {
    switch (type) {
      case 'cardNumber': {
        return 19;
      }
      case 'cardCVV': {
        return 3;
      }
    }
  };

  const _changeCardExpiry = (value) => {
    if (value.indexOf('.') >= 0 || value.length > 5) {
      return;
    }

    if (value.length === 2 && cardMonYear.length === 1) {
      value += '/';
    }

    if (containsOnlyMonthYear(value)) {
      setCardMonYear(
        value
          .replace(/\s?/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim()
      );
    }
    if (value == '') {
      setCardMonYear('');
    }
  };

  function containsOnlyNumbers(str) {
    return /^[0-9, ' ']+$/.test(str);
  }
  function containsOnlyStrings(str) {
    return /^[a-z,A-Z ' ']+$/.test(str);
  }
  function containsOnlyMonthYear(str) {
    return /^[0-9,/]+$/.test(str);
  }
  function containsOnlyCV(str) {
    return /^[0-9]+$/.test(str);
  }
  return (
    <View
      style={[style.background, { width: window.width, height: window.height }]}
    >
      <View
        style={[
          style.container,
          { width: window.width * 0.3, height: window.height * 0.8 },
        ]}
      >
        <View style={style.titleContainer}>
          <CustomText
            textAlign={'left'}
            fontFamily={'Gilroy-bold'}
            fontSize={fontResize(mxWidth * 0.013)}
          >
            {Strings.ADD_NEW_CARD}
          </CustomText>

          <TouchableOpacity onPress={() => onDismiss('Close')}>
            <Image
              resizeMode="contain"
              style={style.closeButton}
              source={CrossIcon}
            />
          </TouchableOpacity>
        </View>

        <CustomText
          style={style.title2}
          textAlign={'left'}
          fontFamily={'Gilroy-Medium'}
          fontSize={fontResize(mxWidth * 0.009)}
        >
          {Strings.BILLING_INFORMATION}
        </CustomText>

        <CustomInputText
          labelStyle={{
            color: Colors.lightGray,
            fontSize: fontResize(mxWidth * 0.01),
          }}
          width={'100%'}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.02}
          label={Strings.NAME_ON_CARD}
          onChangeText={(text) => {
            if (containsOnlyStrings(text)) {
              setCardName(text);
            }
            if (text == '') {
              setCardName('');
            }

            if (cardNameErr) {
              if (text.length === 0) {
                setCardNameErr(Strings.CARD_HOLDER_REQUIRED);
              } else {
                setCardNameErr('');
              }
            }
          }}
          value={cardName}
          placeholder={''}
          window={window}
          isError={cardNameErr != ''}
          errorMessage={cardNameErr}
        />

        <CustomInputText
          labelStyle={{
            color: Colors.lightGray,
            fontSize: fontResize(mxWidth * 0.01),
          }}
          width={'100%'}
          marginBottom={window.height * 0.02}
          label={Strings.CARD_NO}
          onChangeText={(text) => {
            if (containsOnlyNumbers(text)) {
              setCardNum(
                text
                  .replace(/\s?/g, '')
                  .replace(/(\d{4})/g, '$1 ')
                  .trim()
              );
            }

            if (cardNumErr) {
              if (text.length === 0) {
                setCardNumErr(Strings.CARD_NUMBER_REQUIRED);
              } else {
                setCardNumErr('');
              }
            }
          }}
          maxLength={maxLength('cardNumber')}
          editable={!isEdit}
          value={cardNum}
          placeholder={''}
          window={window}
          isError={cardNumErr != ''}
          errorMessage={cardNumErr}
        />

        <View style={[style.titleContainer]}>
          <CustomInputText
            labelStyle={{
              color: Colors.lightGray,
              fontSize: fontResize(mxWidth * 0.01),
            }}
            label={Strings.EXPIRY_DATE}
            width={width * 0.48}
            marginBottom={window.height * 0.02}
            onChangeText={(text) => {
              _changeCardExpiry(text);

              if (cardMonYearErr) {
                if (text.length === 0) {
                  setCardMonYearErr(Strings.CARD_EXPIRE_DATE_REQUIRED);
                } else {
                  setCardMonYearErr('');
                }
              }
            }}
            value={cardMonYear}
            placeholder={''}
            window={window}
            isError={cardMonYearErr != ''}
            errorMessage={cardMonYearErr}
          />

          <CustomInputText
            labelStyle={{
              color: Colors.lightGray,
              fontSize: fontResize(mxWidth * 0.01),
            }}
            label={Strings.CARD_CVV}
            width={width * 0.48}
            marginBottom={window.height * 0.02}
            onChangeText={(text) => {
              if (containsOnlyCV(text)) {
                setCardCvv(text);
              }
              if (text == '') {
                setCardCvv('');
              }
              if (cardCvvErr) {
                if (text.length === 0) {
                  setCardCvvErr(Strings.CARD_CVV_REQUIRED);
                } else {
                  setCardCvvErr('');
                }
              }
            }}
            value={cardCvv}
            placeholder={''}
            window={window}
            isError={cardCvvErr != ''}
            errorMessage={cardCvvErr}
            maxLength={maxLength('cardCVV')}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <View>
            <CustomButton
              onPress={() => {
                onPressLogin();
              }}
              width={width * 0.45}
              height={'60px'}
              marginTop={'10%'}
              backgroundColor={Colors.Blueberry}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'16px'}
              textColor={Colors.White}
              textTransform={'capitalize'}
              text={Strings.SUBMIT}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddNewCard;
