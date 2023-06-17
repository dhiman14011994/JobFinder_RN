import { TouchableOpacity, Image, FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { style } from './style';
import NotificationTab from './NotificationTab';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsCard from '../../Component/NoificationsCard';
import EndPoint from '../../Redux/constants/EndPoint';
import {
  fetchNormalNotificationAction,
  fetchViewedNotificationAction,
} from '../../Redux/actions/profileAction';
import { setIsNotification, setLoading } from '../../Redux/actions/authAction';
import { getDateTime, theme } from '../../Util/constant';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { RouteName } from '../../Navigation/routeName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({ navigation }) => {
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const userData = useSelector((state) => state?.auth?.userData);
  const isSubscribed = userInfo?.profile_subscription ? true : false;
  const dispatch = useDispatch();
  const viewedNotifications = useSelector(
    (state) => state?.profile?.viewedNotifications
  );
  const normalNotifications = useSelector(
    (state) => state?.profile?.normalNotifications
  );
  const [isSelected, setIsSelected] = useState(true);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  useEffect(() => {
    fetchNotifications();
    AsyncStorage.setItem('isNotification', 'false')
      .then((res) => {})
      .catch((err) => {});
    dispatch(setIsNotification(false));
  }, []);
  const fetchNotifications = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchNormalNotificationAction({
          onSuccess: (result) => {
            dispatch(setLoading(false));
            fetchViewedProfileNotification();
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error>>>data', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const fetchViewedProfileNotification = () => {
    try {
      dispatch(
        fetchViewedNotificationAction({
          onSuccess: (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error>>>data', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const renderItem = ({ item, index }) => {
    var date = new Date(item?.created_at);
    var formatted = getDateTime(item?.created_at || item?.updated_at);

    return (
      <NotificationsCard
        userImage={EndPoint.baseAssestURL + item?.user?.image || ''}
        title={item?.admin_title || item?.title || ''}
        description={item?.description}
        referenceNo={'' || ''}
        time={formatted || ''}
        subscriptionType={isSubscribed ? 1 : 0}
        reviewPress={() => {}}
        isSelected={isSelected}
        userNamePress={() => {
          moveOtherProfile(item);
        }}
        onPress={() => {
          movePostDetails(item);
        }}
        item={item}
      />
    );
  };

  const moveOtherProfile = (item) => {
    navigation.navigate(RouteName.OTHER_PROFILE, {
      userId: item?.user?._id,
    });
  };

  const movePostDetails = (item) => {
    if (item?.data != null && item?.data != undefined) {
      navigation.navigate(RouteName.POST_DETAILS, {
        postData: { _id: item?.data?.post_id },
      });
    }
  };

  const listEmptyComponent = () => {
    if (
      !isSelected &&
      userInfo?.profile_subscription == null &&
      viewedNotifications.length > 0 &&
      type == Strings.PROFESSIONAL
    ) {
      return (
        <View
          style={{
            width: mxWidth * 0.9,
            height: mxHeight * 0.75,
            marginHorizontal: mxWidth * 0.05,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 20 }}>
            <Text
              style={{
                ...theme.fontBold,
                color: Colors.Black,
              }}
            >{`${viewedNotifications.length} person`}</Text>
            {` viewed your profile`}
          </Text>

          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: Colors.Blueberry,
              padding: 5,
              borderRadius: 35,
              width: '80%',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => navigation.navigate(RouteName.SUBSCRIPTIONS)}
          >
            <Text
              style={{
                color: Colors.Blueberry,
                fontSize: 25,
                ...theme.fontBold,
              }}
            >{`Try Premium Membership `}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: mxWidth,
            height: mxHeight * 0.75,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            {isSelected
              ? Strings.NO_NOTIFICATION
              : userInfo?.profile_subscription == null
              ? `${Strings.PLEASE_UPGRADE_GOLD}`
              : Strings.NO_NOTIFICATION}
          </Text>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={{
          paddingHorizontal: 12,
          width: '90%',
          marginHorizontal: '5%',
        }}
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
        title={Strings.NOTIFICATIONS}
      />
      <NotificationTab
        isSelected={isSelected}
        onPress={(text) => setIsSelected(text)}
      />
      <FlatList
        data={
          isSelected
            ? normalNotifications
            : userInfo?.profile_subscription == null
            ? type == Strings.PROFESSIONAL
              ? []
              : viewedNotifications
            : viewedNotifications
        }
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
};
export default Notification;
