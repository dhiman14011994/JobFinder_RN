import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import {
  headerSearch,
  headerLogo,
  notificationIcon,
} from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import CustomSearchBar from '../../Component/CustomSearchBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../Events';
import { theme } from '../../Util/constant';
import { mxWidth } from '../../Util';
import JobPostItem from '../../Component/JobPostItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  fetchJobs,
  setLoading,
} from '../../Redux/actions/jobAndEventAction';
import { RouteName } from '../../Navigation/routeName';
import MyJobs from './MyJobs';
import MyEvents from './MyEvents';
import MyPromotion from './MyPromotion';
const Tab = createMaterialTopTabNavigator();
const OrgMainJobAndEvent = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const isNotification = useSelector((state) => state.auth.isNotification);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <CustomHeader
        leftButtons={null}
        rightButtons={
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteName.JOB_NOTIFICATION)}
              style={{ padding: 6 }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 30, width: 30 }}
                source={notificationIcon}
              />
              {isNotification && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: 'red',
                    borderRadius: 5,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                />
              )}
            </TouchableOpacity>
          </>
        }
        isTitleLeft
        title={'Jobs'}
      />

      <Tab.Navigator
        initialRouteName="Job"
        screenOptions={{
          tabBarInactiveTintColor: Colors.DimGray,
          tabBarActiveTintColor: Colors.Blueberry,
          tabBarLabelStyle: {
            fontSize: 16,
            ...theme.fontMedium,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            height: 4,
            backgroundColor: Colors.Blueberry,
          },
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen
          name="MyJobs"
          component={MyJobs}
          options={{ tabBarLabel: 'Jobs', inactiveTintColor: 'red' }}
        />
        <Tab.Screen
          name="MyEvents"
          component={MyEvents}
          options={{ tabBarLabel: 'Events' }}
        />
        {selectUser == 'Organization' && (
          <Tab.Screen
            name="MyPromotion"
            component={MyPromotion}
            options={{ tabBarLabel: 'Promotions' }}
          />
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default OrgMainJobAndEvent;
