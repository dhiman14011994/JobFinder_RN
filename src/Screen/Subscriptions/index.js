import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import {
  backIcon,
  rightIcon,
  BasicPlanIcon,
  GoldPlanIcon,
  TickGreenIcon,
  applyJobSelectedIcon,
  CancelSubscriptionIcon,
} from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { style } from './style';
import { CustomText } from '../../Component/CustomComponent';
import NotchArea from '../../Component/SafeArea';
import { mxHeight, mxWidth, productSkus } from '../../Util';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import CustomButton from '../../Component/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  buySubscriptions,
  buySubscriptionsIos,
  cancelSubscriptions,
  fetchCardAction,
  fetchMyProfile,
  fetchSubscriptions,
} from '../../Redux/actions/profileAction';
import { setLoading } from '../../Redux/actions/authAction';
import { RouteName } from '../../Navigation/routeName';
import SimpleToast from 'react-native-simple-toast';
import Emitter from '../../Util/eventEmitter';
import { Sku, useIAP } from 'react-native-iap';
import { updateGoldMemberFirebaseChatList } from '../../Constants/FireStoremanager/FireStoremanager';

const Subscriptions = ({ navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const subscriptionList = useSelector(
    (state) => state.profile.subscriptionList
  );
  const { subscriptions, getSubscriptions, requestSubscription } = useIAP();
  const cardList = useSelector((state) => state.profile.cardList);
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const [selectedPlanIndex, setselectedPlanIndex] = useState(0);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [showUserNotSubscriberModal, setShowUserNotSubscriberModal] =
    useState(false);

  const [isBuySubscription, setBuySubscription] = useState(false);
  useEffect(() => {
    fetchSubscription();

    handleGetProducts();
    Emitter.on('Subscribed', () => {
      fetchSubscription();
    });
    return () => {
      Emitter.off('Subscribed');
    };
  }, []);

  const handleGetProducts = async () => {
    if (Platform.OS == 'ios') {
      try {
        await getSubscriptions({ skus: productSkus });
      } catch (error) {
        console.log('handleGetProducts', error);
      }
    }
  };

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
            console.log('error', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCards();
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
            console.log('error>>>');
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
            const blockchatUser = updateGoldMemberFirebaseChatList({
              id: userData.data._id,
              isSubscription: true,
            });
            alert('Subscription has been done.');
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
            SimpleToast.show(
              result?.message || 'Subscription successfully cancel'
            );
            const blockchatUser = updateGoldMemberFirebaseChatList({
              id: userData.data._id,
              isSubscription: false,
            });
            fetchSubscription();
            dispatch(setLoading(false));
            setselectedPlanIndex(0);
            setBuySubscription(false);
          },
          onError: (error) => {
            console.log('error', JSON.stringify(error));
            // SimpleToast.show(error?.message);
            dispatch(setLoading(false));
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
      console.og('error', error);
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
    if (index == 1) {
    }
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
          marginBottom: 16,
          padding: '5%',
          width: '90%',
          marginHorizontal: '5%',
          marginVertical: '3%',

          borderColor:
            item.type === 'gold' ? Colors.GoldColor : Colors.Blueberry,
          borderWidth: 1,
          borderRadius: 16,
        }}
      >
        {selectedPlanIndex === index && (
          <View>
            <Image
              style={{
                position: 'absolute',
                top: -mxHeight * 0.035,
                right: -mxWidth * 0.065,
                height: 20,
                width: 20,
              }}
              source={applyJobSelectedIcon}
            />
          </View>
        )}

        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{
              height: mxWidth * 0.15,
              width: mxWidth * 0.15,
              borderRadius: (mxWidth * 0.2) / 2,
            }}
            source={item.type === 'gold' ? GoldPlanIcon : BasicPlanIcon}
          />
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <CustomText
                fontSize={`${fontResize(18)}px`}
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
                      ? `${fontResize(20)}px`
                      : `${fontResize(18)}px`
                  }
                  textColor={
                    item.type === 'gold' ? Colors.GoldColor : Colors.Blueberry
                  }
                  {...theme.fontSemiBold}
                >
                  {item?.price || ''}
                </CustomText>

                <CustomText
                  fontSize={`${fontResize(10)}px`}
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
                    paddingVertical: 10,
                    paddingRight: 16,
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: mxWidth * 0.05,
                      width: mxWidth * 0.05,
                      borderRadius: (mxWidth * 0.2) / 2,
                      marginRight: 6,
                    }}
                    source={TickGreenIcon}
                  />
                  <CustomText
                    fontSize={`${fontResize(14)}px`}
                    textColor={Colors.DimGray}
                    style={{ lineHeight: fontResize(16) }}
                    {...theme.fontRegular}
                  >
                    {it || ''}
                  </CustomText>
                </View>
              );
            })}
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
            paddingVertical: 30,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: Colors.White,
          }}
        >
          {/* Header */}
          <CustomHeader
            leftButtons={
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ padding: 12 }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 20, width: 20 }}
                  source={backIcon}
                />
              </TouchableOpacity>
            }
            rightButtons={<></>}
            titleStyle={{ ...theme.fontSemiBold, fontSize: 17 }}
            title={'Cancel Your Subscription?'}
          />
          <View style={{ paddingHorizontal: 16 }}>
            <CustomText {...theme.fontRegular} fontSize={'15px'}>
              Are you sure you want to cancel your subscription?
            </CustomText>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <CustomButton
                onPress={() => cancelSubscription()}
                width={'40%'}
                height={'50px'}
                backgroundColor={Colors.Blueberry}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
                textColor={Colors.White}
                textTransform={'capitalize'}
                text={'Yes'}
              />
              <CustomButton
                onPress={() => setShowCancelSubscriptionModal(false)}
                width={'40%'}
                height={'50px'}
                backgroundColor={Colors.White}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
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
            paddingVertical: 30,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: Colors.White,
          }}
        >
          {/* Header */}
          <CustomHeader
            leftButtons={
              <TouchableOpacity
                onPress={() => setShowUserNotSubscriberModal(false)}
                style={{ padding: 12 }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 20, width: 20 }}
                  source={backIcon}
                />
              </TouchableOpacity>
            }
            rightButtons={<></>}
            titleStyle={{
              ...theme.fontSemiBold,
              fontSize: 17,
              color: Colors.Red,
            }}
            title={'Not Subscribed Yet!'}
          />
          <View style={{ paddingHorizontal: 16 }}>
            <CustomText {...theme.fontRegular} fontSize={'15px'}>
              Sorry, You are not currently subscribe to premium packages.
            </CustomText>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <CustomButton
                onPress={() => setShowUserNotSubscriberModal(false)}
                width={'40%'}
                height={'50px'}
                backgroundColor={Colors.White}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
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

  const buyIapSubscription = async (data) => {
    

    try {
      await requestSubscription({
        sku: productSkus[0],
      }).then(async (result) => {
        dispatch(setLoading(true));
        dispatch(
          buySubscriptionsIos({
            data,
            onSuccess: (result) => {
              fetchSubscription();
              fetchProProfile();
              dispatch(setLoading(false));
              
              const blockchatUser = updateGoldMemberFirebaseChatList({
                id: userData.data._id,
                isSubscription: true,
              });
              alert('Subscription has been done.');
              setBuySubscription(true);
            },
            onError: (error) => {
              dispatch(setLoading(false));
            },
          })
        );
      });
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={[style.container, NotchArea.AndroidSafeArea]}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 20,
              backgroundColor: Colors.GhostWhite,
              borderRadius: 10,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 18, width: 18 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.SUBSCRIPTIONS_HEADER}
      />

      <FlatList
        data={subscriptionList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View style={style.emptyVw}>
              <Text>Subscription data not found</Text>
            </View>
          );
        }}
      />

      {console.log(
        'subscriptionList>>>',
        subscriptionList.length !== 0 &&
          subscriptionList != undefined &&
          subscriptionList != null
      )}
      {subscriptionList.length !== 0 &&
        subscriptionList != undefined &&
        subscriptionList != null && (
          <View>
            <View style={{ paddingHorizontal: 16 }}>
              {Platform.OS !== 'ios' && (
                <CustomButton
                  onPress={() => checkSubScription()}
                  width={'100%'}
                  height={'50px'}
                  buttonImage={CancelSubscriptionIcon}
                  backgroundColor={'#FFECEC'}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  {...theme.fontSemiBold}
                  fontSize={`${width < 400 ? width * 0.03 : 16}px`}
                  textColor={'#FF5D5D'}
                  textTransform={'capitalize'}
                  isLeftImage
                  imageStyle={{ marginRight: width < 400 ? width * 0.02 : 15 }}
                  text={Strings.CANCEL_SUBSCRIPTION}
                  buttonContainer={{ flexDirection: 'row' }}
                  disabled={Platform.OS === 'ios'}
                />
              )}
            </View>
            <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
              <CustomButton
                onPress={() => {
                  if (selectedPlanIndex == 1) {
                    if (
                      subscriptionList[selectedPlanIndex]?.is_subscribed ===
                      null
                    ) {
                      if (Platform.OS == 'ios') {
                        let data = {
                          subscription_id:
                            subscriptionList[selectedPlanIndex]._id,
                          device_name: Platform.OS,
                        };
                        buyIapSubscription(data);
                      } else {
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
                          navigation.navigate(RouteName.ADD_NEW_CARD, {
                            subscriptionData:
                              subscriptionList[selectedPlanIndex],
                            isFromSubscription: true,
                            isEdit: false,
                            data: '',
                          });
                        }
                      }
                    }
                  }
                }}
                width={'100%'}
                height={'50px'}
                backgroundColor={
                  selectedPlanIndex == 0
                    ? Colors.DimGray
                    : isBuySubscription
                    ? Colors.DimGray
                    : Colors.Blueberry
                }
                marginTop={window.height * 0.03}
                marginBottom={window.height * 0.1}
                borderRadius={'10px'}
                disabled={selectedPlanIndex == 0 || isBuySubscription}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
                textColor={Colors.White}
                textTransform={'capitalize'}
                text={Strings.SUBSCRIPTIONS_BUTTON}
              />
            </View>
          </View>
        )}
      {showCancelSubscriptionModal && renderCancelSubscription()}
      {showUserNotSubscriberModal && renderUserNotSubscriber()}
    </SafeAreaView>
  );
};

export default Subscriptions;
