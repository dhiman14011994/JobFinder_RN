import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native-web';
import { CustomText } from '../../Component/CustomComponent';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Emitter from '../../Util/eventEmitter';
import { setLoading } from '../../Redux/actions/authAction';
import CustomButton from '../../Component/CustomButton';
import {
  deleteCardAction,
  fetchCardAction,
  getCardAction,
  setDefaultCardAction,
} from '../../Redux/actions/profileAction';
import {
  Amex,
  CardDeleteIcon,
  Cartes_bancaires,
  Diners,
  Discover,
  JCB,
  Mastercard,
  Unionpay,
  VISA,
} from '../../Resources/assets';
import { RouteName } from '../../Navigation/routeName';
import { theme } from '../../Util/constant';
import AddNewCard from '../AddNewCard/index.web';
import toast from 'react-simple-toasts';
import RemoveCard from '../../Component/RemoveCard/index.web';

const Payment = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const width = window.width * 0.23;
  const [showRemoveCard, setShowRemoveCard] = useState(false);
  const [showAddCard, setAddCard] = useState(false);
  const [isCardEdit, setIsCardEdit] = useState(false);
  const [cardData, setCardData] = useState('');
  const [subscriptionData, setSubscriptionData] = useState([]);
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

  const removeCard = (card_id, customer_id) => {
    let params = `?card_id=${card_id}&customer_id=${customer_id}`;

    dispatch(
      deleteCardAction({
        params,
        onSuccess: (result) => {
          toast('Card has been deleted.');

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
          setIsCardEdit(true);
          setCardData(result.data || '');
          setAddCard(true);
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: Colors.Gray,
          backgroundColor: Colors.White,
          padding: window.width * 0.02,
          borderRadius: window.height * 0.03,
          marginRight: window.height * 0.05,
          marginBottom: window.height * 0.05,
          borderWidth: 2,
        }}
      >
        <View
          style={{
            width: window.width * 0.23,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: width / 2 }}>
            <CustomText
              fontSize={fontResize(mxWidth * 0.012)}
              {...theme.fontSemiBold}
            >
              {item?.cardName ?? item?.name}
            </CustomText>
            <CustomText
              fontSize={fontResize(mxWidth * 0.01)}
              style={{ paddingVertical: window.height * 0.01 }}
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
              backgroundColor={
                item?.is_Default ? Colors.Blueberry : Colors.White
              }
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
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingLeft: window.height * 0.03,
              width: width / 2,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: window.height * 0.05,
                width: window.width * 0.05,
              }}
              source={renderBrandImage(item?.cardBrand.toLowerCase())}
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <CustomButton
                onPress={() => {
                  editCard(item);
                }}
                height={window.height * 0.05}
                width={window.width * 0.05}
                backgroundColor={Colors.White}
                borderRadius={window.height * 0.01}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={fontResize(mxWidth * 0.01)}
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
                  padding: window.height * 0.01,
                  marginLeft: window.width * 0.01,
                  borderRadius: window.height * 0.01,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    height: window.height * 0.03,
                    width: window.width * 0.02,
                  }}
                  source={CardDeleteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: window.width,
        height: window.height * 0.9,
        paddingVertical: window.height * 0.03,
        paddingHorizontal: window.width * 0.13,
        backgroundColor: Colors.White,
        borderRadius: window.width * 0.01,
      }}
    >
      <CustomText
        style={{
          width: window.width,
          paddingVertical: window.height * 0.03,
        }}
        textAlign={'left'}
        fontFamily={'Gilroy-bold'}
        fontSize={fontResize(mxWidth * 0.02)}
      >
        {Strings.MANAGE_CARDS}
      </CustomText>

      <View style={{ height: window.height * 0.5, marginTop: 30 }}>
        <FlatList
          data={cardList}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          vertical
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomText
                fontSize={fontResize(mxWidth * 0.015)}
                textTransform={'capitalize'}
                {...theme.fontRegular}
              >
                {'No Card Found'}
              </CustomText>
            </View>
          }
        />
      </View>

      <View
        style={{
          paddingVertical: window.height * 0.02,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <CustomButton
            onPress={() => {
              setIsCardEdit(false);
              setAddCard(true);
            }}
            width={width}
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

        <Modal animationType="fade" transparent={true} visible={showAddCard}>
          <AddNewCard
            isEdit={isCardEdit}
            data={cardData}
            subscriptionData={subscriptionData}
            isFromSubscription={false}
            onDismiss={(value) => {
              switch (value) {
                case 'isUpdate':
                  toast('Card Successfully Updated.');
                  break;
                case 'isAdded':
                  toast('Card Successfully Added.');
                  break;
                case 'isSubscribe':
                  toast('Successfully Subscribed.');
                  break;
                case 'Close':
                  break;
                default:
                  toast(value);
                  break;
              }
              // toast('Card Successfully Added.');
              setAddCard(false);
            }}

            // onPressDismiss={() => setAddCard(false)}
          />
        </Modal>

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
      </View>
    </View>
  );
};

export default Payment;
