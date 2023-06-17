//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, Image, TouchableOpacity } from 'react-native-web';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { mxHeight, mxWidth } from '../../Util';
import { fontResize } from '../../Util/font';
import { style } from '../Home/style';
import { useDispatch, useSelector } from 'react-redux';
import {
  headerSearch,
  headerLogo,
  notificationIcon,
} from '../../Resources/assets';
import { setLoading } from '../../Redux/actions/authAction';
import EndPoint from '../../Redux/constants/EndPoint';
import {
  fetchNormalNotificationAction,
  fetchViewedNotificationAction,
} from '../../Redux/actions/profileAction';
import { getDateTime, theme } from '../../Util/constant';

// create a component
const Notification = () => {
  const [isNotificationView, setNotificationView] = useState(true);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const userData = useSelector((state) => state?.auth?.userData);
  const isSubscribed = userInfo?.profile_subscription ? true : false;
  const dispatch = useDispatch();

  const normalNotifications = useSelector(
    (state) => state?.profile?.normalNotifications
  );
  const viewedNotifications = useSelector(
    (state) => state?.profile?.viewedNotifications
  );

  useEffect(() => {
    fetchNotifications();
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
            console.log('error', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
  const fetchViewedProfileNotification = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchViewedNotificationAction({
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
  const renderItem = ({ item, index }) => {
    var date = new Date(item?.created_at);
    var formatted = getDateTime(item?.created_at);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.DimGray,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: '2%',
            width: '100%',

            flex: 1,
            // alignItems: 'center',
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={{ height: 50, width: 50, resizeMode: 'cover' }}
              source={EndPoint.baseAssestURL + item?.user?.image || ''}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.boldText}>{item?.title || ''}</Text>
            <Text style={styles.normalText}>{item?.description}</Text>
            <Text style={styles.normalText}>{'' || ''}</Text>
            {/* {isNotificationView == true && (
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={onPressReview}
              >
                <Text style={styles.btnText}>Under Review</Text>
              </TouchableOpacity>
            )} */}
            {isNotificationView == false && (
              <Text style={styles.planTypetext}>{item?.plan || ''}</Text>
            )}
          </View>
        </View>
        <View style={{ marginTop: '2%' }}>
          <Text>{formatted || ''}</Text>
        </View>
      </View>
    );
  };

  const onPressReview = () => {};
  return (
    <View style={styles.container}>
      {/* notification Tab container */}
      <View style={styles.switchTab}>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => setNotificationView(true)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: isNotificationView
                  ? Colors.LightOrangeColor
                  : Colors.DimGray,
              },
            ]}
          >
            {Strings.NOTIFICATIONS}
          </Text>
        </TouchableOpacity>

        <View style={style.tabBorderVertical} />

        <TouchableOpacity
          style={[
            styles.tabContainer,
            {
              borderRightWidth: 0,
              borderBottomColor: isNotificationView
                ? Colors.LightOrangeColor
                : Colors.DimGray,
            },
          ]}
          onPress={() => setNotificationView(false)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: !isNotificationView
                  ? Colors.LightOrangeColor
                  : Colors.DimGray,
                // borderBottomWidth:1
              },
            ]}
          >
            {Strings.WHO_VIEWED}
          </Text>
        </TouchableOpacity>
      </View>
      {/* notification view */}
      {isNotificationView == true && (
        <View style={styles.subContainer}>
          <FlatList
            data={normalNotifications}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // ListEmptyComponent={listEmptyComponent}
          />
        </View>
      )}
      {/* who viewMe view */}
      {isNotificationView == false && (
        <View style={styles.subContainer}>
          <FlatList
            data={viewedNotifications}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // ListEmptyComponent={listEmptyComponent}
          />
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '16%',
    paddingTop: '3%',
    flex: 1,
  },
  switchTab: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Colors.PrimaryGray,
  },
  tabContainer: {
    width: '50%',
    height: mxHeight * 0.03,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBorderVertical: {
    borderWidth: 1,
    height: 10,
    width: 10,
    backgroundColor: 'green',
  },
  tabText: {
    fontSize: fontResize(20),
  },
  subContainer: {
    marginTop: '2%',
    flex: 1,
    width: '90%',
    paddingHorizontal: '2%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  boldText: {
    fontSize: fontResize(16),
    fontWeight: '800',
    paddingBottom: '1%',
  },
  textContainer: {
    marginLeft: '2%',
    width: '70%',
  },
  normalText: {
    fontSize: fontResize(16),
    color: Colors.DimGray,
    paddingBottom: '1%',
  },
  btnContainer: {
    height: '30%',
    width: '30%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.paleYellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    overflow: 'hidden',
  },
  btnText: {
    color: Colors.darkYellow,
    fontSize: fontResize(15),
  },
  planTypetext: {
    fontSize: fontResize(15),
    color: Colors.yellow[300],
  },
});

//make this component available to the app
export default Notification;
