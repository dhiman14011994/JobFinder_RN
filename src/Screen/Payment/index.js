import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
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
import Strings from '../../Resources/Strings';
import { style } from './style';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import CustomButton from '../../Component/CustomButton';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import CustomModal from '../../Component/CustomModal/CustomModal';
import RemoveCard from '../../Component/RemoveCard';
import { RouteName } from '../../Navigation/routeName';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  buySubscriptions,
  deleteCardAction,
  fetchCardAction,
  fetchSubscriptions,
  getCardAction,
  setDefaultCardAction,
} from '../../Redux/actions/profileAction';
import { setLoading } from '../../Redux/actions/authAction';
import { fontResize } from '../../Util/font';
import SimpleToast from 'react-native-simple-toast';
import Emitter from '../../Util/eventEmitter';

const Payment = ({ navigation, route }) => {
  const [showRemoveCard, setShowRemoveCard] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const cardList = useSelector((state) => state.profile.cardList);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    Emitter.on('New_card_added', () => {
      fetchCards();
    });
    Emitter.on('Update_card', () => {
      fetchCards();
    });

    return () => {
      Emitter.off('New_card_added');
      Emitter.off('Update_card');
    };
  }, []);

  const fetchCards = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchCardAction({
          onSuccess: (result) => {
            console.log('result', result);
            dispatch(setLoading(false));
            // if (result?.data?.length === 0) {
            //   navigation.navigate(RouteName.ADD_NEW_CARD);
            // }
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

  const removeCard = (card_id, customer_id) => {
    let params = `?card_id=${card_id}&customer_id=${customer_id}`;

    dispatch(
      deleteCardAction({
        params,
        onSuccess: (result) => {
          alert('Card has been deleted.');

          setShowRemoveCard(false);
          fetchCards();
        },
        onError: (error) => {},
      })
    );
  };

  const setAsDefaultCard = (card_id) => {
    let params = {
      card_id,
    };
    dispatch(
      setDefaultCardAction({
        params,
        onSuccess: (result) => {
          fetchCards();
        },
        onError: (error) => {},
      })
    );
  };

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

  const addSubScriptions = ({ item, index }) => {
    try {
      if (route?.params?.data) {
        dispatch(setLoading(true));
        var subscription = {
          subscription_id: route?.params?.data._id,
          card_id: item?.card_id,
        };
        dispatch(
          buySubscriptions(subscription, {
            onSuccess: (result) => {
              SimpleToast.show(result.message || 'Subscriptions successfully');
              dispatch(
                fetchSubscriptions({
                  onSuccess: (result) => {
                    dispatch(setLoading(false));
                    navigation.goBack();
                  },
                  onError: (error) => {
                    dispatch(setLoading(false));
                  },
                })
              );
            },
            onError: (error) => {
              dispatch(setLoading(false));
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const editCard = (data) => {
    const params = {
      card_id: data?.card_id,
      customer_id: data?.customer_id,
    };
    dispatch(
      getCardAction({
        params,
        onSuccess: (result) => {
          dispatch(setLoading(false));
          navigation.navigate(RouteName.ADD_NEW_CARD, {
            subscriptionData: [],
            isFromSubscription: false,
            data: result.data || '',
            isEdit: true,
          });
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
    // navigation.navigate(RouteName.ADD_NEW_CARD, {
    //   subscriptionData: [],
    //   isFromSubscription: false,
    //   data: data,
    //   isEdit: true,
    // });
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => addSubScriptions({item, index})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: Colors.White,
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <View>
          <CustomText fontSize={'16px'} {...theme.fontSemiBold}>
            {item?.cardName ?? item?.name}
          </CustomText>
          <CustomText
            fontSize={'15px'}
            style={{ paddingVertical: 8 }}
            {...theme.fontRegular}
          >
            {`*** *** *** *** ${item?.cardLastFourDigit}`}
          </CustomText>
          <CustomButton
            onPress={() =>
              item?.is_Default ? {} : setAsDefaultCard(item?.card_id)
            }
            width={'100%'}
            height={'40px'}
            backgroundColor={item?.is_Default ? Colors.Blueberry : Colors.White}
            borderRadius={'10px'}
            borderColor={
              item?.is_Default ? Colors.Blueberry : Colors.PrimaryGray1
            }
            borderWidth={item?.is_Default ? '0px' : '1px'}
            alignItems={'center'}
            justifyContent={'center'}
            {...theme.fontSemiBold}
            fontSize={'13px'}
            textColor={item?.is_Default ? Colors.White : Colors.PrimaryGray1}
            textTransform={'capitalize'}
            text={item?.is_Default ? 'Default' : 'Set as Default'}
          />
        </View>
        <View
          style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 44, width: 80 }}
            source={renderBrandImage(item?.cardBrand.toLowerCase())}
          />
          <View style={{ flexDirection: 'row' }}>
            <CustomButton
              onPress={() => {
                editCard(item);
              }}
              width={'40%'}
              height={'40px'}
              backgroundColor={Colors.White}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'13px'}
              textColor={Colors.Blueberry}
              textTransform={'capitalize'}
              text={Strings.EDIT}
              borderColor={Colors.Blueberry}
              borderWidth={'1px'}
            />
            <TouchableOpacity
              onPress={() => {
                setShowRemoveCard(true);
                setSelectedIndex(index);
              }}
              style={{
                backgroundColor: Colors.Red,
                padding: 10,
                marginLeft: 8,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
                source={CardDeleteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.MANAGE_CARDS}
      />

      <FlatList
        data={cardList}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <CustomText
              fontSize={`${fontResize(14)}px`}
              textTransform={'capitalize'}
              {...theme.fontRegular}
            >
              {'No Card Found'}
            </CustomText>
          </View>
        }
      />
      <View style={{ paddingVertical: 10 }}>
        <CustomButton
          onPress={() => {
            navigation.navigate(RouteName.ADD_NEW_CARD, {
              subscriptionData: [],
              isFromSubscription: false,
              data: '',
              isEdit: false,
            });
          }}
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
          text={'Add New Card'}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={showRemoveCard}>
        <RemoveCard
          cardItem={cardList[selectedIndex]}
          onRemove={() =>
            selectedIndex !== null
              ? removeCard(
                  cardList[selectedIndex]?.card_id,
                  cardList[selectedIndex]?.customer_id
                )
              : {}
          }
          onPressDismiss={() => setShowRemoveCard(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Payment;
