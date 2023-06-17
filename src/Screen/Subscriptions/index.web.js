import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Emitter from '../../Util/eventEmitter';
import Colors from '../../Resources/Colors';
import {
  FlatList,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native-web';
import { style } from './style';
import { setLoading } from '../../Redux/actions/authAction';
import {
  buySubscriptions,
  cancelSubscriptions,
  fetchCardAction,
  fetchMyProfile,
  fetchSubscriptions,
} from '../../Redux/actions/profileAction';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import {
  BasicPlanIcon,
  GoldPlanIcon,
  TickGreenIcon,
  applyJobSelectedIcon,
  CancelSubscriptionIcon,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import CustomButton from '../../Component/CustomButton';
import AddNewCard from '../AddNewCard/index.web';
import toast from 'react-simple-toasts';

const Subscriptions = ({ navigation }) => {
  const [showAddCard, setAddCard] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const subscriptionList = useSelector(
    (state) => state.profile.subscriptionList
  );
  const cardList = useSelector((state) => state.profile.cardList);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [selectedPlanIndex, setselectedPlanIndex] = useState(0);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [showUserNotSubscriberModal, setShowUserNotSubscriberModal] =
    useState(false);

  const [isBuySubscription, setBuySubscription] = useState(false);
  const window = useWindowDimensions();
  const width = window.width;
  const height = window.height;

  useEffect(() => {
    fetchSubscription();
    Emitter.on('Subscribed', () => {
      fetchSubscription();
      toast('Subscription has been done.');
    });
    return () => {
      Emitter.off('Subscribed');
    };
  }, []);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchSubscription = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchSubscriptions({
          onSuccess: (result) => {
            dispatch(setLoading(false));
            setselectedPlanIndex(
              result?.data[1]?.is_subscribed !== null ? 1 : 0
            );
            setBuySubscription(
              result?.data[1]?.is_subscribed !== null ? true : false
            );
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

  const buySubscription = (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        buySubscriptions({
          data,
          onSuccess: (result) => {
            fetchSubscription();
            fetchProProfile();
            dispatch(setLoading(false));
            toast('Subscription has been done.');
            setBuySubscription(true);
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

  const cancelSubscription = () => {
    try {
      setShowCancelSubscriptionModal(false);
      dispatch(setLoading(true));
      var data = {
        subscription_id:
          subscriptionList[1]?.is_subscribed?.stipeSubscriptionID,
      };
      dispatch(
        cancelSubscriptions({
          data,
          onSuccess: (result) => {
            fetchProProfile();
            toast(result?.message || 'Subscription successfully cancel');
            fetchSubscription();
            dispatch(setLoading(false));
            setselectedPlanIndex(0);
            setBuySubscription(false);
          },
          onError: (error) => {
            toast(error?.message);
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const checkSubScription = () => {
    if (subscriptionList[1].is_subscribed == null) {
      setShowUserNotSubscriberModal(true);
    } else {
      if (selectedPlanIndex == 0) {
        setShowUserNotSubscriberModal(true);
      } else {
        if (
          subscriptionList[1]?.is_subscribed?.device_name !== 'ios' &&
          Platform.OS !== 'ios'
        ) {
          setShowCancelSubscriptionModal(true);
        } else {
          alert('Subscription have been taken from another device');
        }
      }
    }
  };

  const selectSubscription = ({ item, index }) => {
    setselectedPlanIndex(index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          selectSubscription({ item, index });
        }}
        style={{
          marginBottom: height * 0.05,
          padding: width * 0.02,
          borderColor:
            item.type === 'gold' ? Colors.GoldColor : Colors.Blueberry,
          borderWidth: 2,
          borderRadius: height * 0.02,
          marginRight: width * 0.05,
          borderWidth: 2,
        }}
      >
        <View
          style={{
            width: window.width * 0.23,
          }}
        >
          {selectedPlanIndex === index && (
            <View>
              <Image
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  top: -height * 0.04,
                  right: -width * 0.032,
                  height: height * 0.03,
                  width: width * 0.03,
                }}
                source={applyJobSelectedIcon}
              />
            </View>
          )}

          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.05,
                width: width * 0.05,
                borderRadius: (width * 0.2) / 2,
              }}
              source={item.type === 'gold' ? GoldPlanIcon : BasicPlanIcon}
            />
            <View style={{ flex: 1, paddingLeft: width * 0.001 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CustomText
                  fontSize={fontResize(width * 0.015)}
                  textColor={
                    item.type === 'gold' ? Colors.GoldColor : Colors.Black
                  }
                  {...theme.fontSemiBold}
                >
                  {item?.title || ''}
                </CustomText>
                <View style={{ alignItems: 'center' }}>
                  <CustomText
                    fontSize={
                      item.type === 'gold'
                        ? fontResize(width * 0.015)
                        : fontResize(width * 0.013)
                    }
                    textColor={
                      item.type === 'gold' ? Colors.GoldColor : Colors.Blueberry
                    }
                    {...theme.fontSemiBold}
                  >
                    {item?.price || ''}
                  </CustomText>

                  <CustomText
                    fontSize={fontResize(width * 0.015)}
                    textColor={Colors.GoldColor}
                    {...theme.fontSemiBold}
                  >
                    {item?.plan_type || ''}
                  </CustomText>
                </View>
              </View>
              {item.descriptions_points.map((it) => {
                return (
                  <View
                    style={{
                      paddingVertical: height * 0.02,
                      paddingRight: width * 0.02,
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        height: height * 0.02,
                        width: width * 0.02,
                        borderRadius: (width * 0.2) / 2,
                        marginRight: width * 0.002,
                      }}
                      source={TickGreenIcon}
                    />
                    <CustomText
                      fontSize={fontResize(width * 0.01)}
                      textColor={Colors.DimGray}
                      style={{ lineHeight: fontResize(height * 0.022) }}
                      {...theme.fontRegular}
                    >
                      {it || ''}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render TopSheet
  const renderCancelSubscription = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowCancelSubscriptionModal(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            paddingTop: height * 0.1,
            paddingBottom: height * 0.1,
            paddingVertical: height * 0.009,
            borderBottomLeftRadius: width * 0.03,
            borderBottomRightRadius: width * 0.03,
            backgroundColor: Colors.White,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <CustomText
              {...theme.fontBold}
              style={{
                textAlign: 'center',
              }}
              fontSize={fontResize(width * 0.019)}
            >
              Cancel Your Subscription?
            </CustomText>
            <CustomText
              textColor={Colors.DimGray}
              {...theme.fontRegular}
              style={{ textAlign: 'center' }}
              marginTop={window.height * 0.018}
              fontSize={fontResize(width * 0.013)}
            >
              Are you sure you want to cancel your subscription?
            </CustomText>
          </View>
          <View
            style={{ paddingHorizontal: width * 0.3, marginTop: height * 0.05 }}
          >
            <View
              style={{
                paddingHorizontal: width * 0.05,
                paddingVertical: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <CustomButton
                onPress={() => cancelSubscription()}
                width={width * 0.14}
                height={width * 0.04}
                backgroundColor={Colors.Blueberry}
                borderRadius={width * 0.01}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={fontResize(width * 0.013)}
                textColor={Colors.White}
                textTransform={'capitalize'}
                text={'Yes'}
              />
              <CustomButton
                onPress={() => setShowCancelSubscriptionModal(false)}
                width={width * 0.14}
                height={width * 0.04}
                backgroundColor={Colors.White}
                borderRadius={width * 0.01}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={fontResize(width * 0.013)}
                textColor={Colors.OrangeColor}
                textTransform={'capitalize'}
                text={'No'}
                borderColor={Colors.OrangeColor}
                borderWidth={'1px'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderUserNotSubscriber = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowCancelSubscriptionModal(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            paddingTop: height * 0.1,
            paddingBottom: height * 0.1,
            paddingVertical: height * 0.009,
            borderBottomLeftRadius: width * 0.03,
            borderBottomRightRadius: width * 0.03,
            backgroundColor: Colors.White,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <CustomText
              {...theme.fontBold}
              style={{
                textAlign: 'center',
                color: Colors.Red,
              }}
              fontSize={fontResize(width * 0.019)}
            >
              Not Subscribed Yet!
            </CustomText>
            <CustomText
              textColor={Colors.DimGray}
              {...theme.fontRegular}
              style={{ textAlign: 'center' }}
              marginTop={window.height * 0.018}
              fontSize={fontResize(width * 0.013)}
            >
              Sorry, You are not currently subscribe to premium packages.
            </CustomText>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <CustomButton
                onPress={() => setShowUserNotSubscriberModal()}
                width={width * 0.14}
                height={width * 0.04}
                backgroundColor={Colors.White}
                borderRadius={width * 0.01}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={fontResize(width * 0.013)}
                textColor={Colors.Red}
                textTransform={'capitalize'}
                text={'Ok'}
                borderColor={Colors.Silver}
                borderWidth={'1px'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: window.width,
        height: window.height * 0.9,
        paddingVertical: window.height * 0.01,
        paddingHorizontal: window.width * 0.1,
        backgroundColor: Colors.White,
      }}
    >
      <CustomText
        style={{
          width: window.width,
          paddingVertical: window.height * 0.03,
        }}
        textAlign={'left'}
        fontFamily={'Gilroy-bold'}
        fontSize={fontResize(width * 0.018)}
      >
        {Strings.SUBSCRIPTIONS_HEADER}
      </CustomText>
      <View style={{ height: height * 0.4 }}>
        <FlatList
          numColumns={2}
          data={subscriptionList}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={style.emptyVw}>
                <Text>Subscription data not found</Text>
              </View>
            );
          }}
        />
      </View>
      {subscriptionList.length !== 0 ||
      subscriptionList != undefined ||
      subscriptionList != null ? (
        <View>
          <View style={{ paddingHorizontal: width * 0.2 }}>
            <CustomButton
              onPress={() => checkSubScription()}
              width={width * 0.3}
              height={height * 0.07}
              buttonImage={CancelSubscriptionIcon}
              backgroundColor={'#FFECEC'}
              borderRadius={width * 0.01}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={fontResize(width * 0.013)}
              textColor={'#FF5D5D'}
              textTransform={'capitalize'}
              text={Strings.CANCEL_SUBSCRIPTION}
            />
          </View>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <CustomButton
              onPress={() => {
                if (selectedPlanIndex == 1) {
                  if (
                    subscriptionList[selectedPlanIndex]?.is_subscribed === null
                  ) {
                    if (cardList.length !== 0) {
                      let defaultCard = cardList.filter((item) => {
                        return item.is_Default == true;
                      });
                      let data = {
                        subscription_id:
                          subscriptionList[selectedPlanIndex]._id,
                        card_id: defaultCard[0]?.card_id,
                        device_name: Platform.OS,
                      };
                      buySubscription(data);
                    } else {
                      setSubscriptionData(subscriptionList[selectedPlanIndex]);
                      setAddCard(true);
                    }
                  }
                }
              }}
              width={width * 0.3}
              height={height * 0.07}
              backgroundColor={
                selectedPlanIndex == 0
                  ? Colors.DimGray
                  : isBuySubscription
                  ? Colors.DimGray
                  : Colors.Blueberry
              }
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.1}
              borderRadius={width * 0.01}
              disabled={selectedPlanIndex == 0 || isBuySubscription}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={fontResize(width * 0.013)}
              textColor={Colors.White}
              textTransform={'capitalize'}
              text={Strings.SUBSCRIPTIONS_BUTTON}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
      {showCancelSubscriptionModal && renderCancelSubscription()}
      {showUserNotSubscriberModal && renderUserNotSubscriber()}
      <Modal animationType="fade" transparent={true} visible={showAddCard}>
        <AddNewCard
          isEdit={false}
          data={''}
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
            setAddCard(false);
          }}
        />
      </Modal>
      ;
    </View>
  );
};

export default Subscriptions;
