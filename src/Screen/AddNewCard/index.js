import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import NotchArea from '../../Component/SafeArea';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon, cardImg } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../Component/CustomButton';
import {
  buySubscriptions,
  createNewCardAction,
  fetchMyProfile,
  updateCardAction,
} from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import Emitter from '../../Util/eventEmitter';
import SimpleToast from 'react-native-simple-toast';
import { updateGoldMemberFirebaseChatList } from '../../Constants/FireStoremanager/FireStoremanager';

const AddNewCard = ({ navigation, route }) => {
  const { width, height } = Dimensions.get('screen');
  const dispatch = useDispatch();
  const [showDate, setShowDate] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.auth.userData);

  const formik = useFormik({
    initialValues: {
      cardHolder: route?.params?.isEdit == true ? route?.params?.data.name : '',
      cardNumber:
        route?.params?.isEdit == true
          ? `**** **** **** ${route?.params?.data.last4}`
          : '',
      cardExpDate:
        route?.params?.isEdit == true
          ? `${route?.params?.data.exp_month}/${String(
              route?.params?.data.exp_year
            ).slice(-2)}`
          : '',
      cardCVV: route?.params?.isEdit == true ? `***` : '',
    },
    validationSchema: Yup.object({
      cardHolder: Yup.string().required('Card holder is required'),
      cardNumber: Yup.string().required('Card number is required'),
      cardExpDate: Yup.string().required('Card exp date is required'),
      cardCVV: Yup.string().required('Card cvv is required'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (route?.params?.isEdit == true) {
        updateCard(values);
      } else {
        createNewCard(values);
      }
    },
  });

  const updateCard = (values) => {
    try {
      const params = {
        name: values.cardHolder,
        exp_month: values.cardExpDate.split('/')[0],
        exp_year: values.cardExpDate.split('/')[1],
        card_id: route?.params?.data?.id,
      };
      dispatch(setLoading(true));
      dispatch(
        updateCardAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            SimpleToast.show('Card update successfully');
            Emitter.emit('Update_card');
            navigation.goBack();
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

  const createNewCard = (values) => {
    try {
      const params = {
        name: values.cardHolder,
        card_number: values.cardNumber.split(' ').join(''),
        exp_month: values.cardExpDate.split('/')[0],
        exp_year: values.cardExpDate.split('/')[1],
        cvc: values.cardCVV,
      };

      dispatch(setLoading(true));
      dispatch(
        createNewCardAction({
          params,
          onSuccess: (result) => {
            if (result?.data === '') {
              dispatch(setLoading(false));
              alert(result?.message);
              return;
            }
            dispatch(setLoading(false));
            Alert.alert('Success', 'Card Successfully Added.', [
              {
                text: 'Okay',
                onPress: () => {
                  const { subscriptionData, isFromSubscription } = route.params;
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
                    navigation.goBack();
                  }
                },
              },
            ]);
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
          const blockchatUser = updateGoldMemberFirebaseChatList({
            id: userData.data._id,
            isSubscription: true,
          });
          navigation.goBack();
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
  const keyboardType = (type) => {
    switch (type) {
      case ('cardNumber', 'cardExpDate', 'cardCVV'): {
        return 'number-pad';
      }
    }
  };

  const _changeCardExpiry = (type, value) => {
    if (value.indexOf('.') >= 0 || value.length > 5) {
      return;
    }

    if (value.length === 2 && formik.values[type].length === 1) {
      value += '/';
    }
    formik.setFieldValue(
      type,
      value
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
    );
  };

  const renderTextInput = (title, type, keyboardType) => {
    return (
      <View
        style={{
          width: type === 'cardExpDate' || type === 'cardCVV' ? '49%' : '100%',
        }}
      >
        <CustomText
          textTransform={'none'}
          {...theme.fontSemiBold}
          textColor={Colors.SilverLight}
        >
          {title}
        </CustomText>
        <View
          style={
            type === 'cardNumber'
              ? {
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  marginTop: 8,
                  borderColor: Colors.Gray,
                  borderRadius: 8,
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  flexDirection: type === 'cardNumber' ? 'row' : 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }
              : {
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  marginTop: 8,
                  borderColor: Colors.Gray,
                  borderRadius: 8,
                  borderWidth: 1,
                  backgroundColor: '#fff',
                }
          }
        >
          <TextInput
            value={formik.values[type]}
            maxLength={maxLength(type)}
            onFocus={() => setShowDate(true)}
            keyboardType={keyboardType}
            editable={
              route?.params?.isEdit == true
                ? type === 'cardNumber'
                  ? false
                  : type === 'cardCVV'
                  ? false
                  : true
                : true
            }
            onChangeText={(text) => {
              if (type === 'cardHolder') {
                formik.setFieldValue(type, text);
              } else if (type === 'cardNumber') {
                formik.setFieldValue(
                  type,
                  text
                    .replace(/\s?/g, '')
                    .replace(/(\d{4})/g, '$1 ')
                    .trim()
                );
              } else if (type === 'cardExpDate') {
                _changeCardExpiry(type, text);
              } else if (type === 'cardCVV') {
                formik.setFieldValue(type, text);
              }
            }}
            style={{
              ...theme.fontRegular,
              fontSize: fontResize(16),
              width: type === 'cardNumber' ? '80%' : '100%',
              color: Colors.Black,
            }}
          />
          {type === 'cardNumber' && (
            <Image style={{ width: 25, height: 20 }} source={cardImg} />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[NotchArea.AndroidSafeArea, { flex: 1 }]}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: height * 0.025,
              borderRadius: height * 0.022,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.03, width: height * 0.03 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={route?.params?.isEdit == true ? Strings.EDIT_CARD : 'Add Card'}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
      >
        <CustomText {...theme.fontSemiBold} textColor={Colors.PrimaryGray1}>
          Card Details
        </CustomText>
        <View style={{ height: 16 }} />
        {renderTextInput('Name on Card', 'cardHolder', 'default')}
        <View style={{ height: 16 }} />
        {renderTextInput('Card Number', 'cardNumber', 'numeric')}
        <View style={{ height: 16 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {renderTextInput('Expiry Date', 'cardExpDate', 'numeric')}

          {renderTextInput('CVV', 'cardCVV', 'numeric')}
        </View>
      </KeyboardAwareScrollView>
      <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
        <CustomButton
          onPress={formik.handleSubmit}
          disabled={
            route?.params?.isEdit == true
              ? formik.values.cardHolder == '' ||
                formik.values.cardExpDate == ''
              : formik.values.cardHolder == '' ||
                formik.values.cardNumber == '' ||
                formik.values.cardExpDate == '' ||
                formik.values.cardCVV == ''
          }
          width={'100%'}
          height={'60px'}
          backgroundColor={Colors.Blueberry}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'16px'}
          textColor={Colors.White}
          textTransform={'capitalize'}
          text={route?.params?.isEdit == true ? 'Update Card' : 'Add Card'}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNewCard;
